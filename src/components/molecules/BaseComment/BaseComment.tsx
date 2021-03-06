import React, { FunctionComponent } from 'react';
import MoreAction from '../MoreAction/MoreAction';
import { SimpleUserFieldsFragment } from '../../../generated/graphql';
import { useAuth } from '../../../utils/contexts/AuthContext';
import UserInfo from '../../organisms/UserInfo/UserInfo';
import { css, useTheme } from '@emotion/react';

interface OwnProps {
  user: SimpleUserFieldsFragment;
  createdAt: string;
  body: string;
}

type Props = OwnProps;

const BaseComment: FunctionComponent<Props> = ({
  user,
  createdAt,
  body,
}) => {
  const { currentUser } = useAuth();
  const theme = useTheme();

  const moreActions = [
    {
      label: 'Edit Comment',
      onClick: () => alert('Edit comment'),
    },
    {
      label: 'Delete Comment',
      onClick: () => alert('Delete comment'),
      color: theme.colors.red,
    },
  ];

  const isAuthor = user?.id === currentUser?.id;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${theme.space / 2}px;
        padding-bottom: 32px;
        border-bottom: 1px solid ${theme.colors.lightGray};
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          position: relative;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <UserInfo
            username={user.username}
            createdAt={createdAt}
            avatar={user.avatar}
          />
        </div>
        <MoreAction isAuthor={isAuthor} moreActions={moreActions} />
      </div>
      <p
        css={css`
          width: 100%;
          font-size: 0.8rem;
          flex: 1;
          margin-top: ${theme.space}px;
        `}
      >
        {body}
      </p>
    </div>
  );
};

export default BaseComment;
