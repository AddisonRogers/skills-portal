import ky from "ky";

// It's a good practice to have the API URL in an environment variable.
// Make sure to create a .env.local file and add NEXT_PUBLIC_OPSHUB_API_URL={{url}} to it.
const api = ky.create({
	prefixUrl: process.env.NEXT_PUBLIC_OPSHUB_API_URL,
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

// GET /queries/GetForecastForPerson
export const getForecastForPerson = (searchParams?: {
	personName?: string;
	page?: number;
	pageSize?: number;
}) => api.get("queries/GetForecastForPerson", { searchParams }).json();

// GET /queries/GetForecastValuesForCapabilities
export const getForecastValuesForCapabilities = (searchParams?: {
	capability?: string;
}) =>
	api.get("queries/GetForecastValuesForCapabilities", { searchParams }).json();

// GET /queries/GetLeavesForCapability
export const getLeavesForCapability = (searchParams?: {
	capability?: string;
	startDate?: number;
	page?: number;
	pageSize?: string;
}) =>
	api
		.get("queries/GetLeavesForCapability", {
			searchParams: searchParams as any,
		})
		.json();

// GET /queries/GetKards
export const getKards = (searchParams?: {
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
}) => api.get("queries/GetKards", { searchParams: searchParams as any }).json();

// GET /queries/GetPeopleOnProjectOrClient
export const getPeopleOnProjectOrClient = (searchParams?: {
	page?: number;
	pageSize?: string;
	projectCode?: string;
	clientName?: string;
}) =>
	api
		.get("queries/GetPeopleOnProjectOrClient", {
			searchParams: searchParams as any,
		})
		.json();

// GET /queries/GetProjectsForPerson
export const getProjectsForPerson = (searchParams?: {
	personName?: string;
	page?: number;
	pageSize?: string;
}) =>
	api
		.get("queries/GetProjectsForPerson", { searchParams: searchParams as any })
		.json();

// GET /queries/GetProjectsForClient
export const getProjectsForClient = (searchParams?: {
	client?: string;
	page?: number;
	pageSize?: string;
}) =>
	api
		.get("queries/GetProjectsForClient", { searchParams: searchParams as any })
		.json();

// GET /queries/GetWorkedTime
export const getWorkedTime = (searchParams?: {
	employee?: string;
	from?: number;
	to?: number;
}) => api.get("queries/GetWorkedTime", { searchParams }).json();

// GET /queries/GetAllocatedTime
export const getAllocatedTime = (searchParams?: {
	employee?: string;
	from?: number;
	to?: number;
}) => api.get("queries/GetAllocatedTime", { searchParams }).json();

// GET /queries/GetForecastValueForCapability
export const getForecastValueForCapability = (searchParams?: {
	financialPeriodName?: string;
	capabilityName?: string;
}) => api.get("queries/GetForecastValueForCapability", { searchParams }).json();

// GET /queries/GetTeamCommentryForCapability
export const getTeamCommentryForCapability = (searchParams?: {
	financialPeriodName?: string;
	capabilityName?: string;
}) => api.get("queries/GetTeamCommentryForCapability", { searchParams }).json();

// GET /queries/GetTimeSheetForPerson
export const getTimeSheetForPerson = (searchParams?: {
	person?: string;
	from?: number;
	to?: number;
}) => api.get("queries/GetTimeSheetForPerson", { searchParams }).json();

// GET /queries/GetFreeDays
export const getFreeDays = (searchParams?: {
	person?: string;
	year?: number;
}) => api.get("queries/GetFreeDays", { searchParams }).json();

// GET /queries/GetCharity
export const getCharity = (searchParams?: { person?: string; year?: number }) =>
	api.get("queries/GetCharity", { searchParams }).json();

// GET /queries/GetNotes
export const getNotes = (searchParams?: { team?: string; date?: number }) =>
	api.get("queries/GetNotes", { searchParams }).json();

// GET /queries/GetMemberDetails
export const getMemberDetails = (searchParams?: { personName?: string }) =>
	api.get("queries/GetMemberDetails", { searchParams }).json();

// GET /queries/GetProjectDetails
export const getProjectDetails = (searchParams?: { projectName?: string }) =>
	api.get("queries/GetProjectDetails", { searchParams }).json();

// GET /queries/GetClientDetails
export const getClientDetails = (searchParams?: { clientName?: string }) =>
	api.get("queries/GetClientDetails", { searchParams }).json();

// GET /
export const getHelloWorld = (headers?: { "X-Forwarded-For"?: number }) =>
	api.get("", { headers: headers as any }).json();

// GET /unsoldKards
export const getUnsoldKards = (
	searchParams?: {
		client?: string;
		project?: string;
		phase?: string;
		deliverable?: string;
		taskName?: string;
		hourlyRate?: number;
		effort?: number;
		kardValue?: number;
		earnedValue?: number;
		assignedTo?: string;
		accountable?: string;
		startDate?: string;
		endDate?: string;
		financialPeriod?: string;
		percentComplete?: string;
		createdDate?: string;
		createdBy?: string;
		updatedDate?: string;
		updatedBy?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("unsoldKards", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /deliverables
export const getDeliverables = (
	searchParams?: {
		project?: string;
		deliverable?: string;
		dayRate?: number;
		numberOfDays?: number;
		totalValue?: number;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("deliverables", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /kards
export const getKardsRoot = (
	searchParams?: {
		client?: string;
		project?: string;
		phase?: string;
		deliverable?: string;
		taskName?: string;
		hourlyRate?: number;
		effort?: number;
		kardValue?: number;
		earnedValue?: number;
		assignedTo?: string;
		accountable?: string;
		startDate?: number;
		endDate?: number;
		financialPeriod?: string;
		status?: string;
		percentComplete?: number;
		commentary?: string;
		createdDate?: number;
		updatedDate?: number;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("kards", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /leaveallocations
export const getLeaveAllocations = (
	searchParams?: {
		leaveType?: string;
		member?: string;
		allocation?: number;
		carriedOver?: number;
		year?: number;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("leaveallocations", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /leads
export const getLeads = (
	searchParams?: {
		name?: string;
		value?: number;
		estimatedclosedate?: number;
		leadowner?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("leads", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /leaverecords
export const getLeaveRecords = (
	searchParams?: {
		name?: string;
		leaveType?: string;
		date?: string;
		halfDay?: string;
		status?: string;
		am?: string;
		year?: string;
		approverName?: string;
		createdDate?: string;
		updatedDate?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("leaverecords", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /managedservices
export const getManagedServices = (
	searchParams?: {
		client?: string;
		project?: string;
		financialperiod?: string;
		status?: string;
		value?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("managedservices", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /opportunities
export const getOpportunities = (
	searchParams?: {
		name?: string;
		client?: string;
		value?: string;
		estimatedclosedate?: string;
		opportunityowner?: string;
		status?: string;
		duration?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("opportunities", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /projects
export const getProjects = (
	searchParams?: {
		code?: string;
		budget?: string;
		completionDate?: string;
		category?: string;
		active?: string;
		startDate?: string;
		requiresClientCode?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("projects", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /teamtargets
export const getTeamTargets = (
	searchParams?: {
		teamName?: string;
		financialPeriod?: string;
		target?: string;
		startDate?: string;
		showInForecast?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("teamtargets", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /timesheets
export const getTimesheets = (
	searchParams?: {
		wkEnding?: number;
		client?: string;
		project?: string;
		deliverable?: string;
		hours?: string;
		member?: string;
		createdDate?: string;
		updatedDate?: string;
		id?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("timesheets", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

// GET /memberdetails
export const getMemberDetailsRoot = (
	searchParams?: {
		name?: string;
		datefrom?: string;
		status?: string;
		team?: string;
		location?: string;
		contractedHours?: string;
		joinDate?: string;
	},
	headers?: { "X-Forwarded-For"?: number },
) =>
	api
		.get("memberdetails", {
			searchParams: searchParams as any,
			headers: headers as any,
		})
		.json();

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
