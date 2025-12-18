import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  icon: React.ReactNode;
}

export const CharactersStatCard = ({ title, icon, children }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between scroll-py-0 pb-2">
          <CardTitle className="text-sm font-bold">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
