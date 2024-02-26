import { useRef, useState, Dispatch, SetStateAction, ChangeEvent } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Menu, MenuItem } from "@mui/material"
import { SearchQuizType } from "@quizzy/common"
import { useSecuredRequest } from "entities/account"
import { Edit } from "shared/icons/Edit"
import { More } from "shared/icons/More"
import { Button } from "shared/ui/Button"
import { Checkbox } from "shared/ui/Checkbox"
import { ConfirmModal } from "shared/ui/ConfirmModal"
import { Text } from "shared/ui/Typography"

const modalContent = {
  published: {
    title: "Are you sure you want to unpublish the quiz?",
    description:
      "When your quiz is unpublished no one will be able to see it. However, it can" +
      " be publish it back",
    buttonText: "Unpublish",
  },
  unpublished: {
    title: "Are you sure you want to delete the quiz?",
    description:
      "Deleting the quiz you will never be able to restore it back. Are you sure you" +
      " want to do that?",
    buttonText: "Delete",
  },
}

interface QuizItemProps {
  quiz: SearchQuizType
  noEdit?: boolean
  creatorInfo: {
    id: number
    username: string
    picture: string
  }
  isCreator: boolean
  /**
   * Refetch function
   */
  refetch?(): void

  /**
   * Set selected id (to remove all items)
   */
  setSelected?: Dispatch<SetStateAction<string[]>>
  /**
   * Show smaller / expanded QuizItem
   */
  isExpanded?: boolean
}

export function QuizItem({
  quiz,
  creatorInfo,
  isCreator,
  refetch,
  setSelected,
  noEdit = false,
  isExpanded = true,
}: QuizItemProps) {
  const navigate = useNavigate()
  const request = useSecuredRequest()
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const anchorEl = useRef<HTMLButtonElement>(null)

  const unpublishQuiz = () => {
    request("/api/quiz/unpublish", {
      method: "PUT",
      body: { id: quiz.id },
    }).then(() => refetch!())

    setModalOpen(false)
  }

  const deleteQuiz = () => {
    request("/api/quiz/delete", {
      method: "DELETE",
      body: { id: quiz.id },
    }).then(() => refetch!())

    setModalOpen(false)
  }

  const clickHandler = () => {
    setModalOpen(true)
    setMenuOpen(false)
  }

  const checkboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected!((prevState) =>
      e.target.checked
        ? [...prevState, quiz.id]
        : prevState.filter((id) => id !== quiz.id)
    )
  }
  const isPublished = Number.isInteger(quiz.plays)

  const content = modalContent[isPublished ? "published" : "unpublished"]

  return (
    <div
      className={`${
        isExpanded ? "" : "smaller"
      } flex h-20 items-center gap-4 rounded-md border border-gray bg-white pl-4 pr-3 sm:h-16 xs:h-12 [&.smaller]:h-14`}>
      {/* Confirm modal (for unpublish / delete) */}
      <ConfirmModal
        buttonText={content.buttonText}
        description={content.description}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title={content.title}
        onConfirm={isPublished ? unpublishQuiz : deleteQuiz}
      />
      {!noEdit && isCreator && !isPublished && isExpanded && (
        <Checkbox
          className="h-[1.125rem] w-[1.125rem]"
          name="edit"
          onChange={checkboxChangeHandler}
        />
      )}
      <div className="relative h-full sm:hidden">
        <img
          alt="Quiz"
          className={`${
            isExpanded ? "w-40 lg:w-20" : "w-24"
          } h-full object-cover`}
          src={quiz.cover}
        />
        {isExpanded && (
          <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[0.75rem] text-white">
            {quiz.questions}
          </span>
        )}
      </div>
      <div className="flex h-full flex-1 pb-2.5 pt-3 sm:items-center xs:gap-x-3">
        <div
          className={`${
            isExpanded ? "justify-between" : "justify-center"
          } flex flex-col items-start gap-2`}>
          <Text className="font-semibold leading-[1rem]">{quiz.name}</Text>
          {isExpanded && (
            <div className="flex items-center gap-1.5 xs:hidden">
              <img
                alt="Profile"
                className="h-5 w-5 rounded-full"
                src={creatorInfo.picture}
              />
              <span className="text-[0.75rem]">@{creatorInfo.username}</span>
            </div>
          )}
        </div>
        <div
          className={`${
            isExpanded ? "flex-col xs:flex-row" : "flex-row"
          } ml-auto flex justify-between gap-3.5`}>
          {!noEdit && (
            <div className="flex items-center justify-end gap-2.5">
              {isCreator && (
                <>
                  <NavLink to={`/quiz/edit/${quiz.id}`}>
                    <Edit color="#C8C8C8" height={0.875} width={0.875} />
                  </NavLink>
                  <button
                    ref={anchorEl}
                    type="button"
                    onClick={() => setMenuOpen(true)}>
                    <More color="#C8C8C8" height={0.875} width={0.875} />
                  </button>
                  <Menu
                    anchorEl={anchorEl.current}
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}>
                    {isPublished ? (
                      <div>
                        <MenuItem onClick={() => navigate(`/quiz/${quiz.id}`)}>
                          <span className="text-sm">Start</span>
                        </MenuItem>
                        <MenuItem onClick={clickHandler}>
                          <span className="text-sm text-yellow-600">
                            Unpublish
                          </span>
                        </MenuItem>
                      </div>
                    ) : (
                      <div>
                        <MenuItem
                          onClick={() => navigate(`/quiz/edit/${quiz.id}`)}>
                          <span className="text-sm">Edit</span>
                        </MenuItem>
                        <MenuItem onClick={clickHandler}>
                          <span className="text-sm text-red-500">Delete</span>
                        </MenuItem>
                      </div>
                    )}
                  </Menu>
                </>
              )}
            </div>
          )}
          <div className="mt-auto flex items-center gap-3.5">
            {isPublished && (
              <>
                {isExpanded && (
                  <span className="text-[0.75rem] font-semibold xs:hidden">
                    {quiz.plays} plays
                  </span>
                )}
                <Button
                  as={NavLink}
                  className="px-6 py-1"
                  size="md"
                  to={`/quiz/${quiz.id}`}
                  variant="secondary">
                  Start
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
