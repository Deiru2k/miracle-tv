import { Redirect } from "miracle-tv-client/components/system/Redirect";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DashboardRedirect = () => {
  return <Redirect target="/dashboard/home/streams" />;
};

export default DashboardRedirect;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
}
