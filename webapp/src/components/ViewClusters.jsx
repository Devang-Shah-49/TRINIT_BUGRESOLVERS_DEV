import { useContext } from "react"
import { appContext } from "../context"
import { useQuery } from "react-query";
import { axiosClient } from "../axios";
import Dtable from "./Dtable";

export default function ViewClusters() {
  const { user } = useContext(appContext)
  const { data, isLoading } = useQuery(["get-files", "63e7ce5a230c93083ab70f1e"], () => axiosClient.get("/cluster/get-files"))
  return (
    <div className="flex items-center justify-center w-[60%] mr-auto ml-auto">
    <img src="../src/assets/cluster.png" alt="cluster"/>
    <Dtable />
      {/* {isLoading ? `Loading`: <></>}  */}
    </div>
  )
}