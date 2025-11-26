import ky from "ky";

// It's a good practice to have the API URL in an environment variable.
// Make sure to create a .env.local file and add NEXT_PUBLIC_OPSHUB_API_URL={{url}} to it.
const api = ky.create({
	prefixUrl: process.env.NEXT_PUBLIC_OPSHUB_API_URL,
	headers: {
		"X-Forwarded-For": "1",
	},

	// If your API requires authentication, you can configure a hook like this:
	// hooks: {
	//   beforeRequest: [
	//     async (request) => {
	//       // Add your auth logic here, for example fetching a token
	//       const token = await getAuthToken();
	//       request.headers.set('Authorization', `Bearer ${token}`);
	//     },
	//   ],
	// },
});

export type Kard = {
	MemberName: string;
	Capability: string;
	KardEffort: number;
	KardHourlyRate: number;
	KardStatus: string;
	PercentComplete: number;
	Commentary: string | null;
	StartDate: string;
	EndDate: string;
	KardName: string;
	DeliverableName: string;
	DeliverableNumberOfDays: number;
	Project: string;
	ProjectDescription: string;
	ClientName: string;
};

export async function getKards(searchParams?: {
	page?: number;
	pageSize?: string;
	capability?: string;
	personName?: string;
	startDate?: string;
	endDate?: string;
	status?: string;
	clientName?: string;
	projectName?: string;
	deliverableName?: string;
}): Promise<Kard[]> {
	return api
		.get("queries/GetKards", { searchParams: searchParams as any })
		.json<Kard[]>();
}

export type memberDetailType = {
	Name: string;
	Target: number;
	ContractedHours: number;
	Email: string;
	JoinDate: string;
	LeaveDate: string;
};

export async function getMemberDetails(searchParams?: {
	personName?: string;
}): Promise<memberDetailType[]> {
	return await api
		.get("queries/GetMemberDetails", {
			searchParams: searchParams as any,
		})
		.json<memberDetailType[]>();
}

// GET /teams
export const getTeams = (
	searchParams?: {
		id?: string;
		name?: string;
		teamLeaderId?: string;
		showInForecast?: string;
		sysStartTime?: string;
		sysEndTime?: string;
		receivesManagedServiceRevenue?: string;
		showInLeave?: string;
		showInKanban?: string;
		showInSkillDashboard?: string;
		companyId?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("teams", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();
