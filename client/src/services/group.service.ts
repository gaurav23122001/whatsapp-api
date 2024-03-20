import APIInstance from '../config/APIInstance';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processMergedGroup(group: any) {
	return {
		id: group.id as string,
		name: group.name as string,
		groups: group.groups as string[],
		group_reply_saved: {
			text: group.group_reply_saved.text ?? '',
			shared_contact_cards: group.group_reply_saved.shared_contact_cards ?? [],
			attachments: group.group_reply_saved.attachments ?? [],
			polls: group.group_reply_saved.polls ?? [],
		},
		group_reply_unsaved: {
			text: group.group_reply_unsaved.text ?? '',
			shared_contact_cards: group.group_reply_unsaved.shared_contact_cards ?? [],
			attachments: group.group_reply_unsaved.attachments ?? [],
			polls: group.group_reply_unsaved.polls ?? [],
		},
		private_reply_saved: {
			text: group.private_reply_saved.text ?? '',
			shared_contact_cards: group.private_reply_saved.shared_contact_cards ?? [],
			attachments: group.private_reply_saved.attachments ?? [],
			polls: group.private_reply_saved.polls ?? [],
		},
		private_reply_unsaved: {
			text: group.private_reply_unsaved.text ?? '',
			shared_contact_cards: group.private_reply_unsaved.shared_contact_cards ?? [],
			attachments: group.private_reply_unsaved.attachments ?? [],
			polls: group.private_reply_unsaved.polls ?? [],
		},
		restricted_numbers: group.restricted_numbers ?? '',
		min_delay: group.min_delay,
		max_delay: group.max_delay,
		reply_business_only: group.reply_business_only,
		random_string: group.random_string,
		active: group.active,
	};
}

export default class GroupService {
	static async listGroups() {
		try {
			const { data } = await APIInstance.get(`/whatsapp/groups`);
			return data.groups.map(
				(group: { id: string; name: string; isMergedGroup: boolean; participants: number }) => ({
					id: group.id,
					name: group.name,
					isMergedGroup: group.isMergedGroup,
					participants: group.participants ?? 0,
				})
			) as { id: string; name: string; isMergedGroup: boolean; participants: number }[];
		} catch (err) {
			return [];
		}
	}
	static async refreshGroups() {
		try {
			const { data } = await APIInstance.post(`/whatsapp/groups/refresh`);
			return data.groups.map(
				(group: { id: string; name: string; isMergedGroup: boolean; participants: number }) => ({
					id: group.id,
					name: group.name,
					isMergedGroup: group.isMergedGroup,
					participants: group.participants ?? 0,
				})
			) as { id: string; name: string; isMergedGroup: boolean; participants: number }[];
		} catch (err) {
			return [];
		}
	}
	static async fetchGroup(
		ids: string[],
		{
			vcf_only = false,
			business_contacts_only = false,
			saved_contacts = false,
			non_saved_contacts = false,
		}
	) {
		try {
			await APIInstance.post(`/whatsapp/groups/export`, {
				vcf: vcf_only,
				business_contacts_only,
				group_ids: ids,
				saved: saved_contacts,
				unsaved: non_saved_contacts,
			});
			return true;
		} catch (err) {
			return false;
		}
	}
	static async createGroup(name: string, csv_file: string) {
		try {
			await APIInstance.post(`/whatsapp/groups`, { name, csv_file });
			return true;
		} catch (err) {
			return false;
		}
	}

	static async mergeGroups(details: {
		group_name: string;
		group_ids: string[];
		group_reply_saved: {
			text: string;
			shared_contact_cards: string[];
			attachments: string[];
			polls: {
				title: string;
				options: string[];
				isMultiSelect: boolean;
			}[];
		};
		group_reply_unsaved: {
			text: string;
			shared_contact_cards: string[];
			attachments: string[];
			polls: {
				title: string;
				options: string[];
				isMultiSelect: boolean;
			}[];
		};
		private_reply_saved: {
			text: string;
			shared_contact_cards: string[];
			attachments: string[];
			polls: {
				title: string;
				options: string[];
				isMultiSelect: boolean;
			}[];
		};
		private_reply_unsaved: {
			text: string;
			shared_contact_cards: string[];
			attachments: string[];
			polls: {
				title: string;
				options: string[];
				isMultiSelect: boolean;
			}[];
		};
		min_delay: number;
		max_delay: number;
		reply_business_only: boolean;
		random_string: boolean;
		restricted_numbers: string;
	}) {
		try {
			const { data } = await APIInstance.post(`/whatsapp/groups/merge`, {
				group_name: details.group_name,
				group_ids: details.group_ids,
				group_reply_saved: details.group_reply_saved,
				group_reply_unsaved: details.group_reply_unsaved,
				private_reply_saved: details.private_reply_saved,
				private_reply_unsaved: details.private_reply_unsaved,
				restricted_numbers: details.restricted_numbers || null,
				min_delay: details.min_delay,
				max_delay: details.max_delay,
				reply_business_only: details.reply_business_only,
				random_string: details.random_string,
			});
			return processMergedGroup(data.group);
		} catch (err) {
			throw new Error('Error Saving group');
		}
	}

	static async mergedGroups() {
		try {
			const { data } = await APIInstance.get(`/whatsapp/groups/merge`);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return data.groups.map(processMergedGroup);
		} catch (err) {
			return [];
		}
	}

	static async editMergedGroup(
		id: string,
		details: {
			name: string;
			groups: string[];
			group_reply_saved: {
				text: string;
				shared_contact_cards: string[];
				attachments: string[];
				polls: {
					title: string;
					options: string[];
					isMultiSelect: boolean;
				}[];
			};
			group_reply_unsaved: {
				text: string;
				shared_contact_cards: string[];
				attachments: string[];
				polls: {
					title: string;
					options: string[];
					isMultiSelect: boolean;
				}[];
			};
			private_reply_saved: {
				text: string;
				shared_contact_cards: string[];
				attachments: string[];
				polls: {
					title: string;
					options: string[];
					isMultiSelect: boolean;
				}[];
			};
			private_reply_unsaved: {
				text: string;
				shared_contact_cards: string[];
				attachments: string[];
				polls: {
					title: string;
					options: string[];
					isMultiSelect: boolean;
				}[];
			};
			restricted_numbers: string;
			min_delay: number;
			max_delay: number;
			reply_business_only: boolean;
			random_string: boolean;
		}
	) {
		try {
			const { data } = await APIInstance.patch(`/whatsapp/groups/merge/${id}`, {
				group_name: details.name,
				group_ids: details.groups,
				group_reply_saved: details.group_reply_saved,
				group_reply_unsaved: details.group_reply_unsaved,
				private_reply_saved: details.private_reply_saved,
				private_reply_unsaved: details.private_reply_unsaved,
				restricted_numbers: details.restricted_numbers || null,
				min_delay: details.min_delay,
				max_delay: details.max_delay,
				reply_business_only: details.reply_business_only,
				random_string: details.random_string,
			});
			return processMergedGroup(data.group);
		} catch (err) {
			throw new Error('Error Saving group');
		}
	}

	static async toggleActiveMergeGroup(id: string): Promise<boolean | null> {
		try {
			const { data } = await APIInstance.post(`/whatsapp/groups/merge/${id}/toggle-active`);
			return data.active;
		} catch (err) {
			return null;
		}
	}

	static async clearHistory(id: string): Promise<boolean> {
		try {
			await APIInstance.post(`/whatsapp/groups/merge/${id}/clear-responses`);
			return true;
		} catch (err) {
			return false;
		}
	}

	static async downloadResponses(id: string) {
		try {
			const response = await APIInstance.get(`/whatsapp/groups/merge/${id}/download-responses`, {
				responseType: 'blob',
			});

			const contentType = response.headers['content-type'];
			const blob = new Blob([response.data], { type: contentType });

			// Create a temporary link element
			const downloadLink = document.createElement('a');
			downloadLink.href = window.URL.createObjectURL(blob);

			const contentDispositionHeader = response.headers['content-disposition'];
			const fileNameMatch = contentDispositionHeader.match(/filename="(.+)"/);
			const fileName = fileNameMatch ? fileNameMatch[1] : 'download.csv';

			downloadLink.download = fileName; // Specify the filename

			// Append the link to the body and trigger the download
			document.body.appendChild(downloadLink);
			downloadLink.click();

			// Clean up - remove the link
			document.body.removeChild(downloadLink);
		} catch (err) {
			//ignore
		}
	}

	static async deleteMerged(id: string) {
		try {
			await APIInstance.delete(`/whatsapp/groups/merge/${id}`);
			return true;
		} catch (err) {
			return false;
		}
	}

	static async addProfilePicture(file: File, selectedGroups: string[]) {
		const formData = new FormData();
		formData.append('file', file);
		for (const group of selectedGroups) {
			formData.append('groups[]', group);
		}
		await APIInstance.put(`/whatsapp/groups`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return true;
	}

	static async updateProfileSettings(
		{
			description,
			edit_group_settings,
			send_messages,
			add_others,
			admin_group_settings,
		}: Partial<{
			description: string;
			edit_group_settings: boolean;
			send_messages: boolean;
			add_others: boolean;
			admin_group_settings: boolean;
		}>,
		selectedGroups: string[]
	) {
		await APIInstance.patch(`/whatsapp/groups`, {
			description,
			edit_group_settings,
			send_messages,
			add_others,
			admin_group_settings,
			groups: selectedGroups,
		});
		return true;
	}
}
