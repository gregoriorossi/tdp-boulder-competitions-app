import classNames from "../App.module.scss";
import logoTesteDiPietra from '../assets/teste-di-pietra_logo.png';

export function Footer() {
	return <div className={classNames.footer}>
		<a href="https://www.testedipietra.it" target="_blank">
			<img src={logoTesteDiPietra} alt="Teste Di Pietra Logo" />
		</a>
		<div>
			<p>&nbsp;© 2026 Teste Di Pietra. All rights reserved.</p>
		</div>
	</div>;
}