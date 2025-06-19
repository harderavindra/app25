import { useState } from "react";
import FilterDropdown from "../components/ui/FilterDropdown";
import ListViewToggle from "../components/ui/ListViewToggle";
import RadioButton from "../components/ui/RadioButton"
import SearchPage from "../components/ui/SearchPage";

const AdminUsers = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
        { label: 'Guest', value: 'guest' },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">Admin Users</h1>
                <SearchPage />
            </div>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <FilterDropdown
                        label=""
                        options={options}
                        selected={selectedOptions}
                        onChange={setSelectedOptions}
                        multiSelect={true}
                        clearable={true}
                        placeholder="Select roles..."
                    />
                </div>
            <div className="">
                <ListViewToggle />
            </div>
            </div>
        </div>
    );
};

export default AdminUsers;
