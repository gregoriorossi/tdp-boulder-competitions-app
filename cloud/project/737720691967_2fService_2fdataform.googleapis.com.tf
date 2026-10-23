resource "google_project_service" "dataform_googleapis_com" {
  project = "737720691967"
  service = "dataform.googleapis.com"
}
# terraform import google_project_service.dataform_googleapis_com 737720691967/dataform.googleapis.com
