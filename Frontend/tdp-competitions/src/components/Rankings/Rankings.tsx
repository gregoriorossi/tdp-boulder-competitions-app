interface IRankingsProps {
	competitionId: string;
}

export function Rankings(props: IRankingsProps) {
	const { competitionId } = props;

	return <div>
		<h1>Rankings</h1>
	</div>;
}