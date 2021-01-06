import React from "react";
import { Box, Heading, Flex, Link, Divider } from '@chakra-ui/react'

import AuthorsPage from './pages/AuthorsPage';
import UsersPage from './pages/UsersPage';

import { Routes, Route, Link as RouterLink } from 'react-router-dom'

export default function App() {
    return (
        <>
            <Flex direction="column" align="center" width="75%" mx="auto">
                <Flex align="center" justify="space-between" w="100%">
                    <Link to='/' as={RouterLink}>
                        <Heading as='h1'>Personal Library</Heading>
                    </Link>
                    <Flex >
                        <Link to="/" as={RouterLink}><Box as="span">Authors</Box></Link>
                        <Divider orientation="vertical" />
                        <Link to="/users" as={RouterLink}><Box as="span">Users</Box></Link>
                    </Flex>
                </Flex>

                <Routes>
                    <Route path='/' element={<AuthorsPage />} />
                    <Route path='/users' element={<UsersPage />} />
                </Routes>
            </Flex>
        </>
    );
}