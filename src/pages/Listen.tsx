import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import StationCard from "@/components/StationCard";
import { stations } from "@/data/stations";

const Listen = () => (
  <Layout>
    <PageHeader
      eyebrow="Now Broadcasting"
      title="Listen Live"
      subtitle="Tune in to Good To Go Radio and the full Good To Go Radio network from anywhere in the world."
    />
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stations.map((s) => <StationCard key={s.slug} station={s} variant="detailed" />)}
        </div>
      </div>
    </section>
  </Layout>
);

export default Listen;
