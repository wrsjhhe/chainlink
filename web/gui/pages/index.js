import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import url from 'url'
import 'isomorphic-unfetch'

const styles = theme => ({});

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { jobs: [] }
  }

  componentDidMount () {
    const port = this.props.router.query.port || global.location.port
    const jobsUrl = url.format({
      hostname: global.location.hostname,
      port: port,
      pathname: '/v2/specs'
    })

    fetch(jobsUrl, {credentials: 'include'})
      .then(response => response.json())
      .then(({data: jobs}) => this.setState({jobs: jobs}))
      .catch(error => console.log(error))
  }

  render () {
    const {classes} = this.props
    const {jobs} = this.state

    return (
      <div>
        <Typography variant='title' color='inherit'>
          Jobs
        </Typography>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Initiators</TableCell>
              <TableCell>Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map(j => {
              return (
                <TableRow key={j.id}>
                  <TableCell component="th" scope="row">
                    {j.id}
                  </TableCell>
                  <TableCell>{j.attributes.createdAt}</TableCell>
                  <TableCell>{j.attributes.initiators.length}</TableCell>
                  <TableCell>{j.attributes.tasks.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Index))
