import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  label: string;
  value: number;
  change: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface StatsOverviewProps {
  stats: Stat[];
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.iconBg} ${stat.iconColor}`}>
                <span className="material-icons">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                <h2 className="text-2xl font-bold text-neutral-800">{stat.value}</h2>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium flex items-center ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span className="material-icons text-sm mr-1">
                  {stat.change >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {Math.abs(stat.change)}%
              </span>
              <span className="text-neutral-500 ml-2">vs last week</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
