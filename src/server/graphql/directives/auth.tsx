import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLFieldConfig } from "graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { any, identity, prop } from "ramda";
import { checkRight } from "miracle-tv-server/db/acl/roles";
import { ServerError } from "miracle-tv-server/graphql/errors/general";
import {
  AuthenticationError,
  AuthorizationError,
} from "miracle-tv-server/graphql/errors/auth";

const roleGuard =
  (schema: any, directiveName: string) =>
  (fieldConfig: GraphQLFieldConfig<any, any>) => {
    const upperDirective = getDirective(
      schema,
      fieldConfig,
      directiveName
    )?.[0];

    if (upperDirective) {
      // Get this field's original resolver
      const { resolve = defaultFieldResolver } = fieldConfig;

      // Replace the original resolver with a function that *first* calls
      // the original resolver, then converts its result to upper case
      fieldConfig.resolve = async function (
        source,
        args,
        context: ResolverContext,
        info
      ) {
        if (!context.user) {
          throw new AuthenticationError();
        }
        const roles = upperDirective["roles"]?.filter(identity) || [];
        const rights = upperDirective["rights"]?.filter(identity) || [];
        if (roles.length === 0 && rights.length === 0) {
          throw new ServerError(
            "Misconfigured access directive: Must have either roles, rights or both parameters set."
          );
        }
        const hasRoles =
          roles.length > 0
            ? any(
                (role) => roles.includes(role),
                context.userRoles.map(prop("name"))
              )
            : true;
        const hasRights =
          rights.length > 0
            ? any((right: any) => {
                return checkRight(context.userRoles, right.unit, right.subject);
              }, rights)
            : true;
        if (hasRoles && hasRights) {
          return await resolve(source, args, context, info);
        } else {
          throw new AuthorizationError();
        }
      };
      return fieldConfig;
    }
  };

export function authDirective(schema: any, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: roleGuard(schema, directiveName),
    [MapperKind.QUERY_ROOT_FIELD]: roleGuard(schema, directiveName),
    [MapperKind.MUTATION_ROOT_FIELD]: roleGuard(schema, directiveName),
  });
}
