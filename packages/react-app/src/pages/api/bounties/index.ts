import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Bounty from '../../../models/Bounty';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const { method } = req;

	await dbConnect();

	switch (method) {
	case 'GET':
		try {
			const bounties = await Bounty.find({
				status: ['Open', 'In-Progress', 'In-Review'],
			});
			/* find all bounties that aren't in draft or deleted */
			res.status(200).json({ success: true, data: bounties });
		} catch (error) {
			res.status(400).json({ success: false });
		}
		break;
	default:
		res.status(400).json({ success: false });
		break;
	}
}