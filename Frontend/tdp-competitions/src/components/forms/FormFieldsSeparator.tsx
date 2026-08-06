interface IFormFieldsSeparatorProps {
	title: string;
	subtitle?: string;
}

export function FormFieldsSeparator(props: IFormFieldsSeparatorProps) {
	return <div>
		<h4>{props.title}</h4>
		{
			props.subtitle &&
			<div dangerouslySetInnerHTML={{ __html: props.subtitle }}></div>
		}
	</div>
}