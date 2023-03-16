import { MobileButton } from '@/components/common/button';
import { MobilePageContainer } from '@/components/common/pageContainer/mobile';
import {
  PAGE_PERMISSION_DESCRIPTION,
  PAGE_PERMISSION_TITLE,
  permissionOptionsType,
  permissionsOptions,
  SyntaxHighlighterTheme,
} from '@/constant';
import { usePermission } from '@/hooks/logic/permission/usePermission';
import {
  Box,
  Flex,
  Text,
  Image,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { vw } from '@/utils';
import { isEmptyObject } from '@/utils/is';
import SyntaxHighlighter from 'react-syntax-highlighter';
export const PermissionMobile = () => {
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
    <MobilePageContainer
      pageTitle={PAGE_PERMISSION_TITLE}
      pageDescription={PAGE_PERMISSION_DESCRIPTION}
    >
      <Box>
        <Menu placement="bottom-end">
          <MenuButton pointerEvents="auto" width="100%">
            <Flex
              border="2px solid #3B3B3B"
              borderRadius={vw(8)}
              marginTop={vw(32)}
              paddingX={vw(12)}
              paddingY={vw(12)}
              align="center"
            >
              <Spacer height="100%">
                <Flex align="center" height="100%">
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
                width={vw(24)}
                height={vw(24)}
                opacity={0.5}
                _hover={{
                  opacity: 1,
                }}
                transition="0.3s"
                transform="rotate(-90deg)"
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

        <MobileButton
          text="Validate"
          onClick={validateChannelPermission}
          loading={loading}
        />

        {!isEmptyObject(detectionResult) ? (
          <Box>
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
              fontSize={vw(24)}
              height={vw(30)}
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
    </MobilePageContainer>
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
      height={vw(46)}
      bg="#333333"
      borderRadius="4px"
      fontWeight="400"
      fontSize={vw(24)}
      align="center"
      paddingY={vw(6)}
      paddingX={vw(12)}
      marginRight="6px"
    >
      <Text color="#ffffff">{permission}</Text>
      <Box width="10px" />
      <Image
        src="/imgs/cross.svg"
        width={vw(24)}
        height={vw(24)}
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
