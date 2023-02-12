import React from "react";
import { Tab } from "@headlessui/react";
import Introduction from "./Introduction";
import FileUpload from "./FileUpload";
import Dtable from "./Dtable";
import ViewClusters from "./ViewClusters";
import Network from "./Network";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  return (
    <div>
      <Tab.Group>
        <Tab.List
          // as={Fragment}
          className="mt-4 flex items-center justify-center w-1/2 rounded-xl bg-indigo-600 lg:mx-96 p-1"
        >
          <Tab
            index={1}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-indigo-600"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Introduction
          </Tab>
          <Tab
            index={1}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-indigo-600"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Upload data
          </Tab>
          <Tab
            index={1}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-indigo-600"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            View Clusters
          </Tab>
          <Tab
            index={1}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-indigo-600"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Help/Docs
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-2">
            <Tab.Panel>
                <>
                    {/* Add code/component for tab1 - intro*/}
                    <Introduction />
                </>
            </Tab.Panel>
            <Tab.Panel>
                <>
                    {/* Add code/component for tab2 - upload data*/}
                    <FileUpload />
                </>
            </Tab.Panel>
            <Tab.Panel>
                <>
                    {/* Add code/component for tab3 - view clusters */}
                    <ViewClusters />
                    
                </>
            </Tab.Panel>
            <Tab.Panel>
                <>
                    {/* Add code/component for tab4 - docs*/}
                    <Dtable />
                    {/* <Network /> */}
                </>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
