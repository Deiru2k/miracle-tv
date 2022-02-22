import { Redirect } from "miracle-tv-client/components/system/Redirect";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SettingsRedirect = () => {
  return <Redirect target="/settings/user/profile" />;
};

export default SettingsRedirect;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
}
