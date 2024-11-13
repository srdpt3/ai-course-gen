import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingDialog = ({ loading }) => {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              <div className="flex flex-col items-center py-5">
                <Image src={"/pepe.jpg"} width={100} height={100}></Image>
                <h2 className="my-3">Please wait... Ai is working on</h2>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LoadingDialog;
