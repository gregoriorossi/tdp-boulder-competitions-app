resource "google_project" "teste_di_pietra" {
  auto_create_network = true
  billing_account     = "01F07E-DCCA1D-E52B75"

  labels = {
    managed-by-cnrm = "true"
  }

  name       = "Teste di Pietra"
  org_id     = "189517618087"
  project_id = "teste-di-pietra"
}
# terraform import google_project.teste_di_pietra projects/teste-di-pietra
