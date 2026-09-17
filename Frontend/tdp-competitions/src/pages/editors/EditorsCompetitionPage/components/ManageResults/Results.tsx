import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import classNames from "../../../../../App.module.scss";
import type { IGetResultsCompetitor, IGetResultsProblemsGroup, IGetResultsSentSpecialProblem, IGetResultsSpecialProblem } from "../../../../../models/competitions.models";
import { ProblemHeaderCell } from "./ProblemHeaderCell";
import { SpecialProblemCell } from "./SpecialFolderCell/SpecialProblemCell";
import { sortResultProblemsFn } from "../../../../../utils/competitions.utils";

interface IResultsProps {
	competitionId: string;
	competitors: IGetResultsCompetitor[];
	problemsGroups: IGetResultsProblemsGroup[];
	problemsScores: { [key: string]: number }
	specialProblems: IGetResultsSpecialProblem[];
	onProblemSent: (competitorId: string, problemId: string) => Promise<void>;
	onProblemUnsent: (problemId: string, sentProblemId: string) => Promise<void>;
}

export interface IResultProblem {
	id: string;
	name: string;
	colorCode: string;
	score: number;
}

const flatAllProblems = (problemsGroups: IGetResultsProblemsGroup[], scores: { [key: string]: number }): IResultProblem[] => {
	return problemsGroups.flatMap(pg =>
		pg.problems
			.map(p => ({
				colorCode: pg.colorCode,
				id: p.id,
				name: p.name,
				score: scores[p.id] ?? 0
			}))
			.sort(sortResultProblemsFn)
	);
}

export function Results(props: IResultsProps) {
	const { competitionId, competitors, problemsGroups, specialProblems, onProblemSent, onProblemUnsent, problemsScores } = props;
	const flatProblems = flatAllProblems(problemsGroups, problemsScores);

	const isProblemSentFn = (competitor: IGetResultsCompetitor, problemId: string): boolean => {
		return competitor.sentProblems.some(sp => sp.problemId === problemId);
	}

	const isSpecialProblemSentFn = (competitor: IGetResultsCompetitor, specialProblemId: string): IGetResultsSentSpecialProblem | undefined => {
		return competitor.sentSpecialProblems.find(sp => sp.specialProblemId === specialProblemId);
	}

	return <div className={classNames.competitors}>

		<TableContainer component={Paper} className={classNames.table}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className={classNames.stickyCell}>&nbsp;</TableCell>
						{specialProblems.map(sp => <ProblemHeaderCell colorCode={"#EEF527"} name={sp.name} key={sp.id} />) }
						{flatProblems.map(p => <ProblemHeaderCell colorCode={p.colorCode} name={p.name} key={p.id} score={p.score ?? 0} />)}
					</TableRow>
				</TableHead>
				<TableBody>
					{competitors.map(c => {
						return <TableRow key={c.id}>
							<TableCell className={classNames.stickyCell}>
								{c.lastName}&nbsp;{c.firstName}
							</TableCell>
							{
								specialProblems.map(sp => {
									const isSpecialProblemSent: IGetResultsSentSpecialProblem | undefined = isSpecialProblemSentFn(c, sp.id);
									console.log("IsspecialProblemSent", isSpecialProblemSent);
									return <TableCell key={sp.id}>
										<SpecialProblemCell
											sent={!!isSpecialProblemSent}
											sentAt={isSpecialProblemSent?.sentAt}
											competitorId={c.id}
											competitionId={competitionId}
											specialProblemId={sp.id}
											sentSpecialProblemId={isSpecialProblemSent?.id} />
									</TableCell>
								})
							}
							{flatProblems.map(p => {
								const isProblemSent: boolean = isProblemSentFn(c, p.id);
								return <TableCell key={p.id}>
									<Checkbox
										checked={isProblemSent}
										onChange={async (_event, checked: boolean) => {
											if (!checked) {
												const sentProblemId = c.sentProblems.find(sp => sp.problemId === p.id);
												if (sentProblemId) {
													await onProblemUnsent(p.id, sentProblemId?.id);
												}
											} else {
												await onProblemSent(c.id, p.id);
											}
										}} />
								</TableCell>;
							})}
						</TableRow>
					})}
				</TableBody>
			</Table>
		</TableContainer>

	</div>
}