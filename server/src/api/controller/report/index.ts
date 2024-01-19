import { NextFunction, Request, Response } from 'express';
import { MessageSchedulerService } from '../../../database/services';
import VoteResponseService from '../../../database/services/vote-response';
import APIError, { API_ERRORS } from '../../../errors/api-errors';
import InternalError, { INTERNAL_ERRORS } from '../../../errors/internal-errors';
import CSVParser from '../../../utils/CSVParser';
import { Respond, RespondCSV } from '../../../utils/ExpressUtils';

async function listCampaigns(req: Request, res: Response, next: NextFunction) {
	const messages = await new MessageSchedulerService(req.locals.user).allCampaigns();

	return Respond({
		res,
		status: 200,
		data: {
			report: messages,
		},
	});
}
async function pauseCampaign(req: Request, res: Response, next: NextFunction) {
	new MessageSchedulerService(req.locals.user).pauseCampaign(req.params.campaign_id);

	return Respond({
		res,
		status: 200,
		data: {},
	});
}
async function deleteCampaign(req: Request, res: Response, next: NextFunction) {
	new MessageSchedulerService(req.locals.user).deleteCampaign(req.params.campaign_id);

	return Respond({
		res,
		status: 200,
		data: {},
	});
}
async function resumeCampaign(req: Request, res: Response, next: NextFunction) {
	new MessageSchedulerService(req.locals.user).resumeCampaign(req.params.campaign_id);

	return Respond({
		res,
		status: 200,
		data: {},
	});
}

async function generateReport(req: Request, res: Response, next: NextFunction) {
	try {
		const scheduler = new MessageSchedulerService(req.locals.user);
		const reports = await scheduler.generateReport(req.params.campaign_id);

		return RespondCSV({
			res,
			filename: 'Campaign Reports',
			data: CSVParser.exportCampaignReport(reports),
		});
	} catch (err) {
		if (err instanceof InternalError) {
			if (err.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
				return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
			}
		}
		return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
	}
}

async function listPolls(req: Request, res: Response, next: NextFunction) {
	const service = new VoteResponseService(req.locals.user);
	const { title, options, isMultiSelect, export_csv } = req.query;

	if (!title || !options || !isMultiSelect) {
		const polls = await service.allPolls();

		return Respond({
			res,
			status: 200,
			data: { polls },
		});
	}

	const polls = await service.getPoll({
		title: String(title),
		options: (options as string).split('|$|'),
		isMultiSelect: String(isMultiSelect) === 'true',
	});

	if (export_csv === 'true') {
		return RespondCSV({
			res,
			filename: 'Poll Reports',
			data: CSVParser.exportPollReport(polls),
		});
	}
	return Respond({
		res,
		status: 200,
		data: {
			polls,
		},
	});
}

const ReportController = {
	listCampaigns,
	pauseCampaign,
	resumeCampaign,
	deleteCampaign,
	generateReport,
	listPolls,
};

export default ReportController;
