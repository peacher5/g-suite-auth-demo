import React from 'react'
import { Avatar, Heading, Pane, Text } from 'evergreen-ui'

const Profile = ({ user, ...props }) => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      backgroundColor="#f9fafa"
      elevation={1}
      borderRadius={4}
      paddingX={16}
      paddingY={8}
      {...props}
    >
      <Avatar src={user.photoURL} size={32} />
      <Pane marginLeft={16}>
        <Heading size={300}>{user.displayName}</Heading>
        <Text size={300} color="muted">
          {user.email}
        </Text>
      </Pane>
    </Pane>
  )
}

export default Profile
