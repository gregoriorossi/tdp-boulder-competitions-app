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
const RankingsStrings = STRINGS.Pages.EditorCompetitionPage.Ranking;

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
				onClick={() => {
					//const url: string = EditorsEndpoints.downloadReport(competitionId);
					//window.open(url, "_blank");
				}}
				variant="contained"
				endIcon={<DownloadIcon />}>
				{RankingsStrings.DownloadRankings}
			</Button>&nbsp;
			<Select
				defaultValue={RankingType.ALL}
				value={rankingType}
				onChange={handleRankingChange}>
				<MenuItem value={RankingType.ALL} key={RankingType.ALL}>
					Tutti
				</MenuItem>
				<MenuItem value={RankingType.MALE} key={RankingType.MALE}>
					Uomini
				</MenuItem>
				<MenuItem value={RankingType.FEMALE} key={RankingType.FEMALE}>
					Donne
				</MenuItem>
			</Select>
		</div>
		<TableContainer component={Paper} className={classNames.table}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className={classNames.stickyCell}>Posizione</TableCell>
						<TableCell className={classNames.stickyCell}>Punteggio</TableCell>
						<TableCell className={classNames.stickyCell}>Cognome</TableCell>
						<TableCell className={classNames.stickyCell}>Nome</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						response.value
							.map((r) =>
								<Ranking
									key={`${r.position}-${r.lastName}`}
									ranking={r} />)
					}
				</TableBody>
			</Table>
		</TableContainer>
	</div>;
}