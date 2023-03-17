import {
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Image,
  Spacer,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { PageContainer } from '../../common/pageContainer';
import {
  PAGE_PERMISSION_DESCRIPTION,
  PAGE_PERMISSION_TITLE,
  permissionOptionsType,
  permissionsOptions,
  SyntaxHighlighterTheme,
} from '../../../constant';

import { OButton } from '../../common/button';
import { usePermission } from '../../../hooks/logic/permission/usePermission';
import { isEmptyObject } from '../../../utils/is';

export const Permission = () => {
  const [curSelectedPermissions, setCurSelectedPermissions] = useState<
    permissionOptionsType[]
  >([]);

  const deletePermission = (permissionValue: number) => {
    const index = curSelectedPermissions.findIndex((val) => {
      return val.value === permissionValue;
    });
    if (index !== -1) {
      setCurSelectedPermissions((pre) => {
        pre.splice(index, 1);
        return [...pre];
      });
    }
  };
  const addPermission = (permissionValue: number, permission: string) => {
    const hasExistence = curSelectedPermissions.findIndex((val) => {
      return val.value === permissionValue;
    });
    if (hasExistence !== -1) {
      return;
    }
    setCurSelectedPermissions((pre) => {
      pre.push({ label: permission, value: permissionValue });
      return [...pre];
    });
  };
  const { getUserChannelPermission } = usePermission();
  const [loading, setLoading] = useState(false);
  const validateChannelPermission = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      if (curSelectedPermissions.length === 0) {
        return;
      }
      const permissions = curSelectedPermissions.reduce((total, permission) => {
        return total + permission.value;
      }, 0);
      const result = await getUserChannelPermission(permissions);
      setDetectionResult(result);
    } finally {
      setLoading(false);
    }
  };

  const [detectionResult, setDetectionResult] = useState<object>({});

  return (
    <PageContainer
      pageTitle={PAGE_PERMISSION_TITLE}
      pageDescription={PAGE_PERMISSION_DESCRIPTION}
    >
      <Box>
        <Box marginTop="20px">
          <Text
            fontWeight="400"
            fontSize="14px"
            height="18px"
            color="rgba(255, 255, 255, 0.6)"
          >
            Permissions
          </Text>

          <Menu placement="bottom-end">
            <MenuButton pointerEvents="auto" width="100%">
              <Flex
                height="35px"
                width="100%"
                border="1px solid #3B3B3B"
                borderRadius="4px"
                align="center"
                padding="6px"
                marginTop="10px"
                pointerEvents="none"
              >
                <Spacer>
                  <Flex align="center">
                    {curSelectedPermissions.length < 1 ? (
                      <Text>Select</Text>
                    ) : (
                      curSelectedPermissions.map((val) => {
                        return (
                          <SelectedItem
                            key={val.value}
                            permission={val.label}
                            value={val.value}
                            deletePermission={deletePermission}
                          />
                        );
                      })
                    )}
                  </Flex>
                </Spacer>

                <Image
                  src="/imgs/downArrow.svg"
                  width="12px"
                  height="12px"
                  opacity={0.5}
                  _hover={{
                    opacity: 1,
                  }}
                  transition="0.3s"
                />
              </Flex>
            </MenuButton>
            <MenuList
              width="220px"
              height="92px"
              bg="#373737"
              border="none"
              padding="4px"
            >
              {permissionsOptions[2].map((val) => {
                return (
                  <PermissionItem
                    key={val.value}
                    permission={val.label}
                    value={val.value}
                    currentlySelectedPermissions={curSelectedPermissions}
                    deletePermission={deletePermission}
                    addPermission={addPermission}
                  />
                );
              })}
            </MenuList>
          </Menu>
        </Box>
        <OButton
          text="Validate"
          onClick={validateChannelPermission}
          width="80px"
          loading={loading}
        />

        {!isEmptyObject(detectionResult) ? (
          <Box marginTop="10px">
            <Box borderRadius="4px" overflow="hidden">
              <SyntaxHighlighter
                language="javascript"
                style={SyntaxHighlighterTheme}
              >
                {JSON.stringify(detectionResult, null, 2)}
              </SyntaxHighlighter>
            </Box>
            <Text
              fontWeight="400"
              fontSize="14px"
              height="18px"
              color="rgba(255, 255, 255, 0.6)"
              marginTop="10px"
            >
              *Noted: int(allowed) & permission &gt; 0 means you passed the
              permission.
            </Text>
          </Box>
        ) : (
          <Box />
        )}
      </Box>
    </PageContainer>
  );
};
export const PermissionItem = (props: {
  permission: string;
  value: number;
  currentlySelectedPermissions: permissionOptionsType[];
  deletePermission: (permissionValue: number) => void;
  addPermission: (permissionValue: number, permission: string) => void;
}) => {
  const {
    value,
    currentlySelectedPermissions,
    permission,
    deletePermission,
    addPermission,
  } = props;
  const isSelected = useMemo(() => {
    return (
      currentlySelectedPermissions.find((val) => {
        return val.value === value;
      }) !== undefined
    );
  }, [currentlySelectedPermissions, value]);
  return (
    <Flex
      height="40px"
      width="100%"
      padding="10px"
      fontWeight="400"
      fontSize="16px"
      lineHeight="20px"
      color="#FFFFFF"
      cursor="pointer"
      _hover={{
        bg: '#3B3B3B',
      }}
      align="center"
      onClick={() => {
        if (isSelected) {
          deletePermission(value);
        } else {
          addPermission(value, permission);
        }
      }}
    >
      {permission}
      <Spacer />
      {isSelected ? (
        <Box
          borderRadius="50%"
          width="14px"
          height="14px"
          bg="#FFFFFF"
          padding="2px"
        >
          <Image src="/imgs/yes.svg" />
        </Box>
      ) : (
        <Box
          border="2px solid #D2D2D2"
          borderRadius="50%"
          width="14px"
          height="14px"
        />
      )}
    </Flex>
  );
};

const SelectedItem = (props: {
  permission: string;
  value: number;
  deletePermission: (permissionValue: number) => void;
}) => {
  const { permission, value, deletePermission } = props;
  return (
    <Flex
      height="23px"
      bg="#333333"
      borderRadius="4px"
      fontWeight="400"
      fontSize="12px"
      align="center"
      padding="6px"
      marginRight="6px"
    >
      <Text color="#ffffff">{permission}</Text>
      <Box width="10px" />
      <Image
        src="/imgs/cross.svg"
        width="12px"
        height="12px"
        opacity={0.5}
        _hover={{ opacity: 1 }}
        transition="0.3s"
        cursor="pointer"
        pointerEvents="auto"
        onClick={(e) => {
          e.stopPropagation();
          deletePermission(value);
        }}
      />
    </Flex>
  );
};
