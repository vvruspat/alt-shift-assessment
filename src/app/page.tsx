import { Applications } from "@/components/Applications/Applications";
import { CreateNewApplicationButton } from "@/components/CreateNewApplicationButton";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { Page } from "@/components/Page";
import { MHeading } from "@/uikit";

export default function ListOfApplicationsPage() {
	return (
		<Page
			header={<MHeading mode="h1">Applications</MHeading>}
			actions={
				<CreateNewApplicationButton
					mode="primary"
					before={<PlusIcon />}
					href="/create"
					size="m"
				/>
			}
		>
			<Applications />
		</Page>
	);
}
