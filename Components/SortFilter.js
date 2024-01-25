import {Popover} from "antd";
import {SortDownArrow, SortUpArrow} from "@/utils/svg";
import {useEffect, useRef} from "react";

const SortFilter = ({
                        children,
                        fields,
                        showPopup,
                        setShowPopup,
                        buttonClassName,
                        setSortFilterVal,
                    }) => {
    const popupRef = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            const filterDropdowns = document.getElementsByClassName("filter-dropdowns")
            const filterDropdownsArray = Array.from(filterDropdowns)
            let isEventFromSelect = false
            filterDropdownsArray?.forEach((item) => {
                isEventFromSelect = item?.contains(event?.target) || isEventFromSelect
            })
            const isFilterButtonClicked = event?.target.classList.contains(buttonClassName)
            if (popupRef?.current && !(popupRef?.current?.contains(event.target) || isEventFromSelect || isFilterButtonClicked)) {
                setShowPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef])

    const applySorting = (fieldName, direction) => {
        setSortFilterVal({field: fieldName, dir: direction})
        setShowPopup(false)
    }

    return (
        <Popover
            placement={"bottomLeft"}
            content={
                <div
                    className={"sort-filter-main"}
                    ref={popupRef}
                >
                    {fields?.map(({label, name}, idx) => (
                        <div
                            className={"filter-inner-container"}
                            key={idx}
                        >
                            <div className={"field-name"}>
                                Sort by {label}
                            </div>
                            <div
                                className={"sort-item align-items-center"}
                                onClick={() => {
                                    applySorting(name, "asc")
                                }}
                            >
                                <SortUpArrow/>
                                <span>
                                    Sort ascending
                                </span>
                            </div>
                            <div
                                className={"sort-item align-items-center"}
                                onClick={() => {
                                    applySorting(name, "desc")
                                }}
                            >
                                <SortDownArrow/>
                                <span>
                                    Sort descending
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            }
            trigger={"click"}
            overlayClassName={"sort-filter-outer"}
            overlayStyle={{
                maxHeight: "200px"
            }}
            open={showPopup}

        >
            {children}
        </Popover>
    )
}

export default SortFilter