import { SettingsIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Flex,
    Icon,
    IconButton,
    Image,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiBarChart2, FiLink2 } from 'react-icons/fi';
import { PiExportBold } from 'react-icons/pi';
import { SiProbot } from 'react-icons/si';
import { TbLogout2, TbMessage2Minus } from 'react-icons/tb';

import { MdOutlineContactPhone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { LOGO } from '../../../assets/Images';
import { NAVIGATION } from '../../../config/const';
import { logout } from '../../../hooks/useAuth';
import { toggleTheme, useTheme } from '../../../hooks/useTheme';
import Settings from '../../pages/settings';

function isActiveTab(tab: string, path: string): boolean {
    if (path.includes(tab)) return true;
    return false;
}

export default function NavigationDrawer() {
    const theme = useTheme();

    const { onOpen, onClose, isOpen } = useDisclosure();

    const handleLogout = async () => {
        logout();
    };

    return (
        <Box>
            <Flex
                direction={'column'}
                alignItems={'center'}
                className="!w-[70px] select-none"
                position={'fixed'}
                left={0}
                minHeight={'100vh'}
                borderRightWidth={'thin'}
                borderRightColor={theme === 'light' ? 'gray.300' : 'gray.500'}
                paddingY={'0.75rem'}
                zIndex={99}
                background={theme === 'light' ? 'white' : '#252525'}
            >
                <Center
                    borderBottomWidth={'thin'}
                    borderBottomColor={
                        theme === 'light' ? 'gray.300' : 'gray.500'
                    }
                    paddingBottom={'0.75rem'}
                    width={'100%'}
                    height={'50px'}
                >
                    <Image
                        src={LOGO}
                        width={'36px'}
                        className="shadow-lg rounded-full"
                    />
                </Center>
                <Box flexGrow={'1'}>
                    <Flex
                        flexDirection={'column'}
                        justifyContent={'center'}
                        paddingY={'1rem'}
                        className="group"
                    >
                        <MenuButton
                            icon={PiExportBold}
                            route={NAVIGATION.EXPORTS}
                        />
                        <MenuButton
                            icon={TbMessage2Minus}
                            route={NAVIGATION.SCHEDULER}
                        />
                        <MenuButton icon={SiProbot} route={NAVIGATION.BOT} />
                        <MenuButton
                            icon={FiBarChart2}
                            route={NAVIGATION.REPORTS}
                        />
                        <MenuButton icon={FiLink2} route={NAVIGATION.SHORT} />
                        <MenuButton
                            icon={MdOutlineContactPhone}
                            route={NAVIGATION.CONTACT}
                        />
                    </Flex>
                </Box>
                <VStack>
                    <IconButton
                        aria-label="Settings"
                        icon={
                            <SettingsIcon
                                color={theme === 'light' ? 'black' : 'white'}
                            />
                        }
                        onClick={onOpen}
                        className="focus:outline-none focus:border-none"
                        backgroundColor={'transparent'}
                        _hover={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                    <IconButton
                        aria-label="Change Theme"
                        icon={theme === 'light' ? <DarkIcon /> : <LightIcon />}
                        onClick={toggleTheme}
                        className="focus:outline-none focus:border-none"
                        backgroundColor={'transparent'}
                        _hover={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                    <IconButton
                        aria-label="Logout"
                        color={theme === 'light' ? 'black' : 'white'}
                        icon={<TbLogout2 />}
                        onClick={handleLogout}
                        className="focus:outline-none focus:border-none rotate-180"
                        backgroundColor={'transparent'}
                        _hover={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                </VStack>
            </Flex>
            <Settings isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}

type MenuButtonProps = {
    route: string;
    icon: IconType;
};

function MenuButton({ route, icon }: MenuButtonProps) {
    const navigate = useNavigate();
    return (
        <Center
            className={`cursor-pointer 
							hover:!scale-110 hover:!shadow-xl  hover:!drop-shadow-lg hover:!bg-green-100
							${
                                isActiveTab(route, location.pathname) &&
                                'shadow-xl  drop-shadow-lg bg-green-200 group-hover:shadow-none group-hover:drop-shadow-none group-hover:bg-transparent'
                            }`}
            padding={'1rem'}
            rounded={'lg'}
            onClick={() => navigate(route)}
        >
            <Icon as={icon} color={'green.400'} width={5} height={5} />
        </Center>
    );
}

function DarkIcon() {
    return (
        <svg
            height="20"
            width="20"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                fillRule="evenodd"
            ></path>
        </svg>
    );
}

function LightIcon() {
    return (
        <svg
            height="20"
            width="20"
            fill="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
        </svg>
    );
}
