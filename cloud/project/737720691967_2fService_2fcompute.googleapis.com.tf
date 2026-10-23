resource "google_project_service" "compute_googleapis_com" {
  project = "737720691967"
  service = "compute.googleapis.com"
}
# terraform import google_project_service.compute_googleapis_com 737720691967/compute.googleapis.com
