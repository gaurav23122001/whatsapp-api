import {
	Box,
	Checkbox,
	HStack,
	Select,
	SkeletonText,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';

import { useEffect, useRef } from 'react';
import { MdGroups3 } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useFilteredList from '../../../hooks/useFilteredList';
import { popFromNavbar, pushToNavbar } from '../../../hooks/useNavbar';
import { useTheme } from '../../../hooks/useTheme';
import UsersService from '../../../services/users.service';
import { StoreNames, StoreState } from '../../../store';
import {
	addSelectedUsers,
	removeSelectedUsers,
	setUsersList,
} from '../../../store/reducers/UsersReducer';
import { NavbarSearchElement } from '../../components/navbar';
import ExtendSubscriptionDialog, { ExtendSubscriptionDialogHandle } from './components';

const UsersPage = () => {
	const theme = useTheme();

	const dispatch = useDispatch();
	const {
		list,
		selectedUsers,
		uiDetails: { isFetching },
	} = useSelector((state: StoreState) => state[StoreNames.USERS]);
	const extendSubscriptionDialogRef = useRef<ExtendSubscriptionDialogHandle>(null);

	useEffect(() => {
		pushToNavbar({
			title: 'Users',
			icon: MdGroups3,
			actions: (
				<HStack>
					<NavbarSearchElement />
				</HStack>
			),
		});
		return () => {
			popFromNavbar();
		};
	}, []);

	const filtered = useFilteredList(list, { name: 1 });

	const handleAction = (user_id: string, action: string) => {
		if (action === 'extend_expiry') {
			return extendSubscriptionDialogRef.current?.open(user_id);
		}
	};
	const extendSubscription = (user_id: string, months: number) => {
		UsersService.extendExpiry(user_id, months ?? 0).then(async () => {
			const users = await UsersService.getUsers();
			dispatch(setUsersList(users));
		});
	};

	return (
		<Box>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th color={theme === 'dark' ? 'whitesmoke' : 'gray'} width={'5%'}>
								sl no
							</Th>
							<Th color={theme === 'dark' ? 'whitesmoke' : 'gray'} width={'45%'}>
								Name
							</Th>
							<Th color={theme === 'dark' ? 'whitesmoke' : 'gray'} width={'15%'} isNumeric>
								Phone
							</Th>
							<Th color={theme === 'dark' ? 'whitesmoke' : 'gray'} width={'10%'}>
								Type
							</Th>
							<Th color={theme === 'dark' ? 'whitesmoke' : 'gray'} width={'10%'}>
								Expiry
							</Th>
							<Th color={theme === 'dark' ? 'whitesmoke' : 'gray'} width={'20%'}>
								Actions
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{isFetching && list.length === 0 ? (
							<Tr color={theme === 'dark' ? 'white' : 'black'}>
								<Td>
									<LineSkeleton />
								</Td>

								<Td>
									<LineSkeleton />
								</Td>

								<Td>
									<LineSkeleton />
								</Td>
								<Td>
									<LineSkeleton />
								</Td>
								<Td>
									<LineSkeleton />
								</Td>
							</Tr>
						) : (
							filtered.map((user, index) => {
								return (
									<Tr key={index} color={theme === 'dark' ? 'white' : 'black'}>
										<Td>
											<Checkbox
												mr={'1rem'}
												isChecked={selectedUsers.includes(user.id)}
												onChange={(e) => {
													if (e.target.checked) {
														dispatch(addSelectedUsers(user.id));
													} else {
														dispatch(removeSelectedUsers(user.id));
													}
												}}
												colorScheme='green'
											/>
											{index + 1}.
										</Td>
										<Td>{user.name}</Td>
										<Td isNumeric>{user.phone}</Td>
										<Td>{user.type}</Td>
										<Td>{user.subscription_expiry}</Td>
										<Td>
											<Select
												placeholder='Select Action'
												value={''}
												onChange={(e) => handleAction(user.id, e.target.value)}
											>
												<option value='extend_expiry'>Extend Subscription</option>
											</Select>
										</Td>
									</Tr>
								);
							})
						)}
					</Tbody>
				</Table>
			</TableContainer>
			<ExtendSubscriptionDialog ref={extendSubscriptionDialogRef} onConfirm={extendSubscription} />
		</Box>
	);
};

function LineSkeleton() {
	return <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='4' rounded={'md'} />;
}

export default UsersPage;