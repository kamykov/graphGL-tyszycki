import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { gql, useMutation } from '@apollo/client';
import { BOOK_COPY_FIELDS_FRAGMENT } from './fragment';
import { GET_USER_QUERY } from '../../pages/UserDetailsPage'


export const BORROW_BOOK_COPY_MUTATION = gql`
  mutation BorrowBookCopy($bookCopyId: ID!) {
    borrowBookCopy(id: $bookCopyId) {
      ...bookCopyFields
    }
  }
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;



export default function BorrowButton({ availableBookCopy }) {
  const toast = useToast();

  const [borrowBookCopy, { loading }] = useMutation(BORROW_BOOK_COPY_MUTATION, {
    variables: {
      bookCopyId: availableBookCopy.id,
    },
    onError: (error) => {
      toast({
        title: "Could not borrow the book",
        description: error.message,
        status: 'error',
        duration: 1000,
        position: "top",
        isClosable: true
      })
    },
    onCompleted: () => {
      toast({
        title: "Success!",
        description: 'You`ve borrowed the book',
        status: 'success',
        duration: 1000,
        position: "top",
        isClosable: true
      })
    },
    // refetchQueries: ({ data }) => [
    //   {
    //     query: GET_USER_QUERY,
    //     variables: { userId: data.borrowBookCopy.borrower.id }
    //   }
    // ],
    update: (cache, {data: {borrowBookCopy}}) => {
      const cachedData = cache.readQuery(
        {
          query: GET_USER_QUERY,
          variables: { userId: borrowBookCopy.borrower.id }
        }
      )
      console.log(cachedData);
      const data = JSON.parse(JSON.stringify(cachedData));
      data.user.borrowedBookCopies.push(borrowBookCopy);
      cache.writeQuery({
        query: GET_USER_QUERY,
        variables: {userId: borrowBookCopy.borrower.id},
        data
      })
    }
  })
  return (
    <Button onClick={borrowBookCopy} disabled={loading}>
      Borrow
    </Button>
  );
}
