import { useRef } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import QuickCreateLink from "../components/dashboard/QuickCreateLink";
import { AnalyticsOverview, DashboardData, Metrics, RecentLinks, WelcomeSection } from "../components/dashboard/DashboardContent";

export default function DashboardPage() {
  const quickCreateRef = useRef(null);
  const user = useSelector(state => state.auth.user);
  const focusQuickCreate = () => quickCreateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return <DashboardLayout onCreate={focusQuickCreate}>
    <div className="mx-auto max-w-360 space-y-7 px-4 py-7 sm:px-6 lg:px-8">
      <WelcomeSection user={user} />
      <QuickCreateLink formRef={quickCreateRef} />
      <DashboardData>{({ urls, loading, error }) => <>
        <Metrics urls={urls} loading={loading} />
        <AnalyticsOverview urls={urls} loading={loading} />
        <RecentLinks urls={urls} loading={loading} error={error} />
      </>}</DashboardData>
    </div>
  </DashboardLayout>;
}
