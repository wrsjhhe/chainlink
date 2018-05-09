import { withRouter } from 'next/router'

const Show = ({ router: { query: { title: title } } }) => (
  <div>
    <div>Job Spec Detail</div>
  </div>
)

export default withRouter(Show)
