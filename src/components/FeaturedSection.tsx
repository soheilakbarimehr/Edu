import { Card } from './Card';

interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface FeaturedSectionProps {
  title: string;
  items: FeaturedItem[];
}

export function FeaturedSection({ title, items }: FeaturedSectionProps) {
  return (
    <section className="py-12 section-divider">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}