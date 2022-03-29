import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Icon,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import { BiCalendar, BiLabel, BiDotsHorizontalRounded, BiX } from 'react-icons/bi';
import React, { FC, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import CardModalLabel from './CardModalLabel';
import CardModalSection from './CardModalSection';
import { Card, fetchBoard } from '../../../features/boardSlice';
import authRequest from '../../../service/authRequest';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useParams } from 'react-router-dom';
import { fetchLabels } from '../../../features/labelsListSlice';
import CardModalActivity from './CardModalActivity';
import CardModalChecklist from './CardModalChecklist';
import CardModalAddChecklist from './CardModalAddChecklist';
import CardModalDuedate from './CardModalDuedate';
import CardModalUpdateDuedate from './CardModalUpdateDuedate';
import CardModalBreadcrumb from './CardModalBreadcrumb';
import CardModalComment from './CardModalComment';

interface CardModalProps {
  card: Card;
  openModal: boolean;
  listName: string;
  boardName: string;
  handleClose: () => void;
}

const CardModal: FC<CardModalProps> = ({ card, openModal, listName, boardName, handleClose }) => {
  const { id } = useParams();

  const [updateCardObject, setUpdateCardObject] = useState({
    title: card.title!,
    description: card.description!,
    listId: card.listId,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  const labels = useAppSelector((state) => state.labelsList);

  const onCardTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCardObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const onCardDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateCardObject((prev) => ({ ...prev, description: event.target.value }));
  };

  const deleteCard = () => {
    authRequest()
      .delete(`card/${card.id}`)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCardTitleDescriptionDueDate = () => {
    authRequest()
      .put(`card/${card.id}`, updateCardObject)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCardLabel = (labelId: number) => {
    authRequest()
      .delete(`card-label/${labelId}`)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCardLabel = (labelId: number) => {
    deleteCardLabel(labelId);
  };

  return (
    <>
      <Modal onClose={() => handleClose()} isOpen={openModal} scrollBehavior={'inside'} size="3xl">
        <ModalOverlay />
        <ModalContent borderRadius="xl" mx="30px">
          <ModalHeader bg="purple.500" borderTopRadius="xl">
            <Box display="flex" gap="25px">
              <Menu>
                <MenuButton>
                  <Icon _hover={{ cursor: 'pointer' }} as={BiCalendar} color="white" fontSize="2xl" />
                </MenuButton>
                <MenuList fontSize="sm" boxSize="min-content" px={5}>
                  {card.duedate && card.duedate !== '2010-01-01' ? (
                    <MenuItem
                      onClick={() => {
                        authRequest()
                          .put(`card/${card.id}`, { duedate: '2010-01-01' })
                          .then(() => {
                            dispatch(fetchBoard(id!));
                          });
                      }}
                    >
                      Remove Duedate
                    </MenuItem>
                  ) : (
                    <MenuItem as={Box} closeOnSelect={false}>
                      <CardModalDuedate cardId={card.id} />
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton>
                  <Icon _hover={{ cursor: 'pointer' }} as={BiLabel} color="white" fontSize="2xl" />
                </MenuButton>
                <MenuList fontSize="sm">
                  <Box display={'flex'} flexDirection="column" gap="10px">
                    <MenuItem closeOnSelect={false}>
                      <Checkbox
                        colorScheme="teal"
                        isChecked={card.labels.some((item) => item.id === 1)}
                        value={labels.data?.find((item) => item.id === 1)?.title}
                        onChange={() => {
                          if (card.labels.some((item) => item.id === 1) === false) {
                            authRequest()
                              .post('card-label', { cardId: card.id, labelId: 1 })
                              .then(() => {
                                dispatch(fetchBoard(id!));
                              })
                              .catch((error) => {
                                console.log('error :>> ', error);
                              });
                          } else {
                            authRequest()
                              .delete(
                                `card-label/${card.labels.find((item) => item.CardLabel.labelId === 1)?.CardLabel.id}`
                              )
                              .then(() => {
                                dispatch(fetchBoard(id!));
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Text>{labels.data?.find((item) => item.id === 1)?.title}</Text>{' '}
                          <Icon as={BiLabel} fontSize="2xl" pl="auto" />
                        </Box>
                      </Checkbox>
                    </MenuItem>
                    <MenuItem closeOnSelect={false}>
                      <Checkbox
                        colorScheme="teal"
                        isChecked={card.labels.some((item) => item.id === 2)}
                        value={labels.data?.find((item) => item.id === 2)?.title}
                        onChange={() => {
                          if (card.labels.some((item) => item.id === 2) === false) {
                            authRequest()
                              .post('card-label', { cardId: card.id, labelId: 2 })
                              .then(() => {
                                dispatch(fetchBoard(id!));
                              })
                              .catch((error) => {
                                console.log('error :>> ', error);
                              });
                          } else {
                            authRequest()
                              .delete(
                                `card-label/${card.labels.find((item) => item.CardLabel.labelId === 2)?.CardLabel.id}`
                              )
                              .then(() => {
                                dispatch(fetchBoard(id!));
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Text>{labels.data?.find((item) => item.id === 2)?.title}</Text>{' '}
                          <Icon as={BiLabel} fontSize="2xl" pl="auto" />
                        </Box>
                      </Checkbox>
                    </MenuItem>
                  </Box>
                </MenuList>
              </Menu>
              <CardModalAddChecklist cardId={card.id} />
              <Menu>
                <MenuButton>
                  <Icon _hover={{ cursor: 'pointer' }} as={BiDotsHorizontalRounded} color="white" fontSize="2xl" />
                </MenuButton>
                <MenuList fontSize="sm" boxSize="-moz-fit-content">
                  <MenuItem onClick={() => deleteCard()}>Remove Card</MenuItem>
                </MenuList>
              </Menu>
              <Icon
                as={BiX}
                _hover={{ cursor: 'pointer' }}
                mt="10px"
                ml="auto"
                fontSize="3xl"
                color="white"
                onClick={handleClose}
              />
            </Box>
          </ModalHeader>
          <ModalBody
            pt="30px"
            pb="45px"
            display="flex"
            flexDirection="column"
            gap="45px"
            sx={{
              '&::-webkit-scrollbar': {
                width: '5px',
                borderRadius: '8px',
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                backgroundColor: `rgb(179,179,179)`,
              },
            }}
          >
            <Box id="BREADCRUMB-DUEADATE-TITLE-DESCRIPTION" display={'flex'} flexDirection="column" gap={'20px'}>
              <Box
                id="BREADCRUMB AND DUE DATE"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CardModalBreadcrumb boardName={boardName} listName={listName} />
                {card.duedate && card.duedate !== '2010-01-01' && (
                  <Box
                    display={'flex'}
                    flexDirection="row"
                    gap="5px"
                    border="1px"
                    borderColor="gray.300"
                    rounded="lg"
                    px="13px"
                    py="10px"
                    fontSize="sm"
                  >
                    <Text>Duedate:</Text>
                    <CardModalUpdateDuedate
                      cardDuedate={card.duedate ? card.duedate : format(new Date(), 'yyyy-MM-dd')}
                      cardId={card.id}
                    />
                  </Box>
                )}
              </Box>
              <Box id="CARD TITLE INPUT">
                <Input
                  placeholder="Title*"
                  size="lg"
                  fontSize="sm"
                  value={updateCardObject.title}
                  onKeyUp={updateCardTitleDescriptionDueDate}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => onCardTitleChange(event)}
                />
              </Box>
              <Box id="CARD DESCRIPTION TEXTAREA">
                <Textarea
                  placeholder="Description"
                  size="sm"
                  height="105px"
                  rounded="lg"
                  resize="none"
                  value={updateCardObject.description}
                  onKeyUp={() => {
                    setTimeout(() => {
                      updateCardTitleDescriptionDueDate();
                    }, 2.0 * 1000);
                  }}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onCardDescriptionChange(event)}
                />
              </Box>
            </Box>

            {card.labels.length !== 0 && (
              <Box id="LABES" display="flex" flexDirection="column" gap="5px">
                <CardModalSection iconType="BiLabel" sectionName="Labels" />
                <Box
                  display="flex"
                  gap="5px"
                  border="1px"
                  borderColor="gray.300"
                  rounded="lg"
                  p="15px"
                  overflowX={'auto'}
                >
                  {card.labels.map((item) => {
                    return (
                      <CardModalLabel
                        key={item.id}
                        labelId={item.id}
                        deleteLabel={() => handleDeleteCardLabel(item.CardLabel.id)}
                      />
                    );
                  })}
                  <Icon
                    as={BiX}
                    _hover={{ cursor: 'pointer' }}
                    ml="auto"
                    fontSize="3xl"
                    color="black"
                    onClick={() => {
                      card.labels?.forEach((item) => {
                        deleteCardLabel(item.CardLabel.id);
                      });
                    }}
                  />
                </Box>
              </Box>
            )}
            <Box id="CHECKLIST AREA" display={card.checklists.length === 0 ? 'none' : 'block'}>
              {card.checklists?.map((item) => {
                return <CardModalChecklist key={item.id} checklist={item} />;
              })}
            </Box>
            <Box id="COMMENT-ACTIVIY" display={'flex'} flexDirection="column" gap="30px">
              <CardModalComment cardId={card.id} />
              {card.comments.length !== 0 && (
                <Box id="ACTIVITY SECTION" display="flex" flexDirection="column" gap="5px">
                  <CardModalSection iconType="BiCommentDetail" sectionName="Activity" />
                  {card.comments.map((item) => {
                    return <CardModalActivity key={item.id} authorName={item.author.username} message={item.message} />;
                  })}
                </Box>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardModal;
