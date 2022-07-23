export function getDBConnectionUrl() {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
  return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
}
