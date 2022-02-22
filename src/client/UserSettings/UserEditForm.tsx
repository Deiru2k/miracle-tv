import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormMarkdown } from "miracle-tv-client/components/form/FormMarkdown";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import { Link } from "miracle-tv-client/components/ui/Link";
import React from "react";
import { useTranslation } from "react-i18next";

export const UserEditForm = () => {
  const { t: tUser } = useTranslation("common");
  const { t: tCommon } = useTranslation("common");
  return (
    <>
      <FormInput name="displayName" label={tUser("display-name")} mb={2} />
      <FormMarkdown
        label={tUser("bio")}
        name="bio"
        rows={10}
        height="auto"
        help={
          <>
            {tCommon("this-field-supports")}{" "}
            <Link
              target="_blank"
              textDecoration="underline"
              href="https://www.markdownguide.org/basic-syntax/"
            >
              markdown
            </Link>
          </>
        }
      />
      <FormToggle name="singleUserMode" label={tUser("single-user-mode")} />
    </>
  );
};
