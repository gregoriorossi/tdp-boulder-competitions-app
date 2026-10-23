resource "google_pubsub_topic" "container_analysis_notes_v1beta1" {
  labels = {
    goog-managed-by = "artifact-analysis"
    managed-by-cnrm = "true"
  }

  name    = "container-analysis-notes-v1beta1"
  project = "teste-di-pietra"
}
# terraform import google_pubsub_topic.container_analysis_notes_v1beta1 projects/teste-di-pietra/topics/container-analysis-notes-v1beta1
