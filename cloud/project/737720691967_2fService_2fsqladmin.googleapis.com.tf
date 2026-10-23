resource "google_project_service" "sqladmin_googleapis_com" {
  project = "737720691967"
  service = "sqladmin.googleapis.com"
}
# terraform import google_project_service.sqladmin_googleapis_com 737720691967/sqladmin.googleapis.com
