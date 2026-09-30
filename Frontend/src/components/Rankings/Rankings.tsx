import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import classNames from "../../App.module.scss";
import { useRankingByCompetitionById } from "../../queries/competitions.queries";
import { ErrorMessage } from "../ErrorMessage";
import { Spinner } from "../Spinner";
import DownloadIcon from '@mui/icons-material/Download';
import { STRINGS } from "../../consts/strings.consts";
import { useState } from "react";
import { Gender } from "../../models/competitions.models";
import { Ranking } from "./Ranking";
import EditorsService from "../../services/editors.service";
const RankingsPageStrings = STRINGS.Pages.EditorCompetitionPage.Ranking;
const RankingsStrings = STRINGS.Rankings;

interface IRankingsProps {
	competitionId: string;
}

const enum RankingType {
	MALE = "MALE",
	FEMALE = "FEMALE",
	ALL = "ALL"
}

const rankingTypeToGenderMap: Record<RankingType, Gender | null> = {
	[RankingType.ALL]: null,
	[RankingType.MALE]: Gender.MALE,
	[RankingType.FEMALE]: Gender.FEMALE
};

export function Rankings(props: IRankingsProps) {
	const { competitionId } = props;
	const [rankingType, setRankingType] = useState<RankingType>(RankingType.ALL);
	const selectedGender = rankingTypeToGenderMap[rankingType];

	const { data: response, isLoading, error } = useRankingByCompetitionById(competitionId, selectedGender);


	if (isLoading) {
		return <Spinner />;
	}

	if (error || response?.isFailure || !response?.value) {
		return <ErrorMessage errorCode={response?.error?.code ?? ''} />
	}

	const handleRankingChange = (event: SelectChangeEvent) => {
		setRankingType(event.target.value as RankingType);
	};

	return <div className={classNames.rankings}>
		<div className={classNames.actionsContainer}>
			<Button
				onClick={async () => {
					await EditorsService.downloadRanking(competitionId, selectedGender);
				}}
				title={RankingsPageStrings.DownloadRankings}
				variant="contained"
				endIcon={<DownloadIcon />}>
				{RankingsPageStrings.DownloadRankings}
			</Button>&nbsp;
			<Select
				defaultValue={RankingType.ALL}
				value={rankingType}
				onChange={handleRankingChange}>
				<MenuItem value={RankingType.ALL} key={RankingType.ALL}>
					{RankingsStrings.Types.ALL}
				</MenuItem>
				<MenuItem value={RankingType.MALE} key={RankingType.MALE}>
					{RankingsStrings.Types.MALE}
				</MenuItem>
				<MenuItem value={RankingType.FEMALE} key={RankingType.FEMALE}>
					{RankingsStrings.Types.FEMALE}
				</MenuItem>
			</Select>
		</div>
		<TableContainer component={Paper} className={classNames.rankingTable}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className={classNames.headerCell}>{RankingsStrings.Table.Rank}</TableCell>
						<TableCell className={classNames.headerCell}>{RankingsStrings.Table.Score}</TableCell>
						<TableCell className={classNames.headerCell}>{RankingsStrings.Table.Surname}</TableCell>
						<TableCell className={classNames.headerCell}>{RankingsStrings.Table.Name}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						response.value
							.map((r) =>
								<Ranking
									className={classNames.ranking}
									key={`${r.position}-${r.lastName}`}
									ranking={r} />)
					}
				</TableBody>
			</Table>
		</TableContainer>
	</div>;
}