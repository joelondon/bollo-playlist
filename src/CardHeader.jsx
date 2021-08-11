import { Flex, Box } from '@chakra-ui/react'
import * as React from 'react'

export const CardHeader = (props) => {
  const { title, action } = props
  return (
    <Flex flexWrap="wrap" align="center" justify="space-between" px="6" py="4" borderBottomWidth="1px">
      <Box fontSize="lg" width="100%">
        {title}
      </Box>
      {action}
    </Flex>
  )
}
