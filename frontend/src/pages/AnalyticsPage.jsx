import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { getAllUserUrls } from "../api/user.api";
import { AnalyticsDataError, AnalyticsHeader, AnalyticsMetrics, BreakdownPanels, ClicksChart, Momentum, TopLinks } from "../components/dashboard/AnalyticsWorkspace";

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const query = useQuery({ queryKey: ["userUrls"], queryFn: getAllUserUrls, staleTime: 0 });
  const urls = query.data?.urls || [];

  return <DashboardLayout activePage="Analytics" onCreate={() => navigate({ to: "/dashboard" })}>
    <div className="mx-auto max-w-360 space-y-6 px-4 py-7 sm:px-6 lg:px-8">
      <AnalyticsHeader urls={urls} />
      {query.isError ? <AnalyticsDataError error={query.error} /> : <>
        <AnalyticsMetrics urls={urls} loading={query.isLoading} />
        <ClicksChart />
        <BreakdownPanels />
        <TopLinks urls={urls} loading={query.isLoading} />
        <Momentum />
      </>}
    </div>
  </DashboardLayout>;
}
