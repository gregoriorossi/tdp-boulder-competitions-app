import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import classNames from "../../App.module.scss";
import type { IGetResultsCompetitior, IGetResultsProblemsGroup } from "../../models/competitions.models";
import { ProblemCell } from "./ProblemCell";

interface IResultsProps {
	competitors: IGetResultsCompetitior[];
	problemsGroups: IGetResultsProblemsGroup[];
}

export interface IResultProblem {
	id: string;
	name: string;
	colorCode: string;
}

const flatAllProblems = (problemsGroups: IGetResultsProblemsGroup[]): IResultProblem[] => {
	return problemsGroups.flatMap(pg =>
		pg.problems.map(p => ({
			colorCode: pg.colorCode,
			id: p.id,
			name: p.name
		}))
	);
}

export function Results(props: IResultsProps) {
	const { competitors, problemsGroups } = props;
	const flatProblems = flatAllProblems(problemsGroups);

	const isProblemSent = (competitor: IGetResultsCompetitior, problemId: string): boolean => {
		return competitor.sentProblems.includes(problemId);
	}

	return <div className={classNames.competitors}>

		<TableContainer component={Paper} className={classNames.table}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className={classNames.stickyCell}>&nbsp;</TableCell>
						{flatProblems.map(p => <ProblemCell problem={p} key={p.id} />)}
					</TableRow>
				</TableHead>
				<TableBody>
					{competitors.map(c => {
						return <TableRow>
							<TableCell className={classNames.stickyCell}>
								{c.lastName}&nbsp;{c.firstName}
							</TableCell>
							{flatProblems.map(p => {
								return <TableCell>
									<Checkbox checked={isProblemSent(c, p.id)} />
								</TableCell>;
							})}
						</TableRow>
					})}
				</TableBody>
			</Table>
		</TableContainer>

	</div>
}