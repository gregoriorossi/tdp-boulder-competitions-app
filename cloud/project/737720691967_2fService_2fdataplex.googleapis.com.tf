resource "google_project_service" "dataplex_googleapis_com" {
  project = "737720691967"
  service = "dataplex.googleapis.com"
}
# terraform import google_project_service.dataplex_googleapis_com 737720691967/dataplex.googleapis.com
