import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import StationCard from "@/components/StationCard";
import { stations } from "@/data/stations";

const Stations = () => (
  <Layout>
    <PageHeader
      eyebrow="The Network"
      title="Good To Go Radio Network"
      subtitle="Ten unique voices. One premium platform. Discover the stations shaping the sound."
    />
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((s) => <StationCard key={s.slug} station={s} variant="detailed" />)}
        </div>
      </div>
    </section>
  </Layout>
);

export default Stations;
