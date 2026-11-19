
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import { getAllUserUrls } from "../api/user.api";

import {
  downloadLinksCsv,
  LinksHeader,
  LinksList,
  LinksMetrics,
  LinksPagination,
  LinksToolbar,
  useLinkControls,
} from "../components/dashboard/LinksWorkspace";

export default function MyLinksPage() {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    staleTime: 0,
  });

  const urls = query.data?.urls || [];

  const controls = useLinkControls(urls);

  const [copiedId, setCopiedId] = useState(null);

  // Copy Short URL
  const copy = async (link) => {
    try {
      await navigator.clipboard.writeText(link.short_url);

      setCopiedId(link._id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      setCopiedId(null);
    }
  };

  // Navigate to Create Link Page
  const goToCreate = () => navigate({ to: "/dashboard" });

  return (
    <DashboardLayout
      activePage="My Links"
      onCreate={goToCreate}
    >
      <div className="mx-auto max-w-360 space-y-6 px-4 py-7 sm:px-6 lg:px-8">

        {/* Page Header */}
        <LinksHeader
          onCreate={goToCreate}
          onExport={() => downloadLinksCsv(controls.filtered)}
          hasLinks={controls.filtered.length > 0}
        />

        {/* Dashboard Metrics */}
        <LinksMetrics
          urls={urls}
          loading={query.isLoading}
        />

        {/* Search, Sort and Filters */}
        <LinksToolbar
          search={controls.search}
          setSearch={controls.setSearch}
          sort={controls.sort}
          setSort={controls.setSort}
          selected={controls.selected}
          clearSelected={() => controls.setSelected(new Set())}
          refetching={query.isFetching}
          onRefresh={query.refetch}
          disabledFilters="This attribute is not supplied by the current API"
        />

        {/* Links Table and Pagination */}
        <section className="space-y-5">
          <LinksList
            links={controls.visible}
            loading={query.isLoading}
            error={query.isError ? query.error : null}
            selected={controls.selected}
            toggle={controls.toggle}
            toggleAll={controls.toggleAll}
            copiedId={copiedId}
            onCopy={copy}
          />

          <LinksPagination
            total={controls.filtered.length}
            page={controls.page}
            setPage={controls.setPage}
            size={controls.size}
            setSize={controls.setSize}
          />
        </section>

      </div>
    </DashboardLayout>
  );
}
