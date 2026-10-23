resource "google_project_service" "run_googleapis_com" {
  project = "737720691967"
  service = "run.googleapis.com"
}
# terraform import google_project_service.run_googleapis_com 737720691967/run.googleapis.com
