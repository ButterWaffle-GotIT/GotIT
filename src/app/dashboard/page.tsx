import TodayTermCardWrapper from "@/app/dashboard/components/TodayTermCardWrapper";
import DashboardClient from "@/app/dashboard/components/DashboardClient";

export default function DashboardPage() {
	return (
		<DashboardClient todayTermCard={<TodayTermCardWrapper />} />
	);
}
