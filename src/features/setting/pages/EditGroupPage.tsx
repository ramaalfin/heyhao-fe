import { Link, useNavigate, useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGroupSchema,
  CreateGroupFormValues,
} from "../schema/createGroupSchema";
import { useUpdateGroup } from "../hooks/useUpdateGroup";
import { useGetDetailGroup } from "../hooks/useGetDetailGroup";
import { useDeleteGroupAsset } from "../hooks/useDeleteGroupAsset";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

export default function EditGroupPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { detailGroup, isLoading: isLoadingDetail } = useGetDetailGroup(
    id || "",
  );
  const { updateGroup, isPending: isUpdating } = useUpdateGroup();
  const { deleteAsset } = useDeleteGroupAsset();

  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateGroupFormValues>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      type: "FREE",
      name: "",
      about: "",
      benefit: [""],
      price: 0,
      assets: [],
    },
  });

  useEffect(() => {
    if (detailGroup) {
      reset({
        id: detailGroup.id,
        type: detailGroup.type as "FREE" | "PAID",
        name: detailGroup.name,
        about: detailGroup.about,
        benefit:
          detailGroup.benefit && detailGroup.benefit.length > 0
            ? detailGroup.benefit
            : [""],
        price: detailGroup.price,
        photo: detailGroup.photo_url,
        assets: [], // We'll handle existing assets separately or just show them
      });
      setPhotoPreview(detailGroup.photo_url);
    }
  }, [detailGroup, reset]);

  const groupType = watch("type");

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefit" as any,
  });

  const newAssets = (watch("assets") as File[]) || [];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("photo", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAsset = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const currentAssets = (watch("assets") as File[]) || [];
      setValue("assets", [...currentAssets, ...Array.from(files)] as any, {
        shouldValidate: true,
      });
    }
    // Reset input
    e.target.value = "";
  };

  const removeNewAsset = (index: number) => {
    const currentAssets = (watch("assets") as File[]) || [];
    const updatedAssets = currentAssets.filter((_, i) => i !== index);
    setValue("assets", updatedAssets as any, { shouldValidate: true });
  };

  const handleDeleteExistingAsset = async (assetId: string) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;

    console.log("assetId", assetId);

    try {
      await deleteAsset(assetId);
      toast.success("Asset deleted successfully");
      // Refetch of detailGroup is handled by react-query if configured,
      // but here we might need to manually trigger or wait for cache invalidation.
      // Re-fetching usually happens automatically if useGetDetailGroup uses the same key.
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete asset");
    }
  };

  const onSubmit = async (data: CreateGroupFormValues) => {
    if (!id) return;
    try {
      const res = await updateGroup({ id, payload: data });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/home/setting/groups/${id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update group");
    }
  };

  if (isLoadingDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="font-semibold text-lg text-heyhao-secondary">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <main id="Main-Content-Container" className="relative flex flex-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <div
          id="Header"
          className="flex h-[122px] w-full items-center justify-between border-b border-heyhao-border p-[30px] bg-white"
        >
          <div className="relative flex flex-col w-full bg-white gap-3">
            <h1 className="font-bold text-2xl leading-[30px]">Edit Group</h1>
            <nav>
              <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
                <li>
                  <Link to="/home/setting" className="hover:underline">
                    Settings
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link to="/home/setting/groups" className="hover:underline">
                    Group Profile
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <span className="font-medium leading-5 text-heyhao-blue">
                    Edit Group
                  </span>
                </li>
              </ol>
            </nav>
          </div>
          <button
            type="submit"
            disabled={isUpdating}
            className="flex shrink-0 rounded-full items-center py-4 px-8 gap-2 bg-heyhao-blue disabled:opacity-50"
          >
            <span className="font-bold leading-5 text-white text-nowrap">
              {isUpdating ? "Saving..." : "Save Changes"}
            </span>
            <img
              src="/assets/images/icons/add-circle-white-fill.svg"
              className="flex size-6 shrink-0"
              alt="icon"
            />
          </button>
        </div>
        <div id="Content" className="flex flex-1 overflow-y-scroll pb-10">
          <div className="flex flex-1 min-h-screen">
            <div
              id="Group-Settings"
              className="flex w-[636px] shrink-0 bg-white"
            >
              <div className="flex flex-col w-full h-fit shrink-0 p-[30px] gap-[30px] bg-white">
                <div id="Photo" className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full overflow-hidden size-[100px] border border-heyhao-border">
                    <img
                      id="photo-container"
                      src={
                        photoPreview ||
                        "/assets/images/photos/group-default.svg"
                      }
                      alt="image"
                      className="object-cover size-full"
                    />
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    id="add-photo"
                    className="flex items-center gap-[6px] px-6 py-4 rounded-full bg-heyhao-black cursor-pointer"
                  >
                    <p className="font-bold leading-[20px] text-white">
                      Change Photo
                    </p>
                    <img
                      src="/assets/images/icons/import-grey.svg"
                      alt="icon"
                      className="size-6 shrink-0"
                    />
                  </button>
                  {errors.photo && (
                    <p className="text-red-500 text-xs">
                      {errors.photo.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-sm text-heyhao-secondary">
                    Group Name
                  </p>
                  <label className="relative group">
                    <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                      <img
                        src="/assets/images/icons/clipboard-grey.svg"
                        className="hidden size-6 shrink-0 group-has-placeholder-shown:flex"
                        alt="icon"
                      />
                      <img
                        src="/assets/images/icons/clipboard-black.svg"
                        className="flex size-6 shrink-0 group-has-placeholder-shown:hidden"
                        alt="icon"
                      />
                      <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                    </div>
                    <input
                      type="text"
                      autoComplete="off"
                      {...register("name")}
                      placeholder="Enter group name"
                      className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                    />
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-sm text-heyhao-secondary">
                    About Group
                  </p>
                  <label className="relative group">
                    <div className="absolute transform -translate-y-1/2 top-8 left-6 flex gap-4 items-center border-r border-heyhao-border pr-4 h-6">
                      <img
                        src="/assets/images/icons/message-text-grey.svg"
                        className="hidden size-6 shrink-0 group-has-placeholder-shown:flex"
                        alt="icon"
                      />
                      <img
                        src="/assets/images/icons/message-text-black.svg"
                        className="flex size-6 shrink-0 group-has-placeholder-shown:hidden"
                        alt="icon"
                      />
                    </div>
                    <textarea
                      {...register("about")}
                      placeholder="Type descriptions"
                      rows={8}
                      className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                    ></textarea>
                  </label>
                  {errors.about && (
                    <p className="text-red-500 text-xs">
                      {errors.about.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-sm text-heyhao-secondary">
                    Group Type
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`relative group flex items-center gap-4 rounded-xl border py-5 px-6 cursor-pointer transition-all duration-300 ${groupType === "FREE" ? "bg-heyhao-blue/10 border-heyhao-blue/10" : "border-heyhao-border hover:border-heyhao-blue"}`}
                    >
                      <div
                        className={`flex h-6 shrink-0 border ${groupType === "FREE" ? "border-heyhao-blue/10" : "border-heyhao-border"}`}
                      ></div>
                      <p
                        className={`w-full font-semibold transition-all duration-300 ${groupType === "FREE" ? "text-heyhao-blue" : "text-heyhao-secondary"}`}
                      >
                        Free
                      </p>
                      <input
                        type="radio"
                        value="FREE"
                        {...register("type")}
                        className="flex size-6 shrink-0 cursor-pointer"
                      />
                    </label>
                    <label
                      className={`relative group flex items-center gap-4 rounded-xl border py-5 px-6 cursor-pointer transition-all duration-300 ${groupType === "PAID" ? "bg-heyhao-blue/10 border-heyhao-blue/10" : "border-heyhao-border hover:border-heyhao-blue"}`}
                    >
                      <img
                        src={
                          groupType === "PAID"
                            ? "/assets/images/icons/crown-blue.svg"
                            : "/assets/images/icons/crown-grey.svg"
                        }
                        className="flex size-6 shrink-0"
                        alt="icon"
                      />
                      <div
                        className={`flex h-6 shrink-0 border ${groupType === "PAID" ? "border-heyhao-blue/10" : "border-heyhao-border"}`}
                      ></div>
                      <p
                        className={`w-full font-semibold transition-all duration-300 ${groupType === "PAID" ? "text-heyhao-blue" : "text-heyhao-secondary"}`}
                      >
                        VIP
                      </p>
                      <input
                        type="radio"
                        value="PAID"
                        {...register("type")}
                        className="flex size-6 shrink-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {groupType === "PAID" && (
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Group Price
                    </p>
                    <label className="relative group">
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/dollar-square-grey.svg"
                          className="hidden size-6 shrink-0 group-has-placeholder-shown:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/dollar-square-black.svg"
                          className="flex size-6 shrink-0 group-has-placeholder-shown:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                        <span className="font-semibold group-has-placeholder-shown:text-heyhao-secondary text-heyhao-black">
                          Rp
                        </span>
                      </div>
                      <input
                        type="number"
                        {...register("price")}
                        placeholder="0"
                        className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[159px] pl-[110px] gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                      />
                      <div
                        id="Lifetime-Badge"
                        className="absolute transform -translate-y-1/2 top-1/2 right-4 flex gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey"
                      >
                        <img
                          src="/assets/images/icons/clock-grey-fill.svg"
                          className="flex size-4 shrink-0"
                          alt="icon"
                        />
                        <p className="font-medium text-sm text-heyhao-secondary">
                          LIFETIME
                        </p>
                      </div>
                    </label>
                    {groupType === "PAID" && (errors as any).price && (
                      <p className="text-red-500 text-xs">
                        {(errors as any).price.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {groupType === "PAID" && (
              <div
                id="Group-Assets-Benefit"
                className="flex flex-col p-[30px] gap-[30px] w-[560px] shrink-0"
              >
                <div
                  id="Assets"
                  className="flex flex-col rounded-3xl p-6 gap-3 bg-white"
                >
                  <p className="font-medium text-sm text-heyhao-secondary">
                    Group Asset
                  </p>
                  <div
                    id="Input-File-Container"
                    className="flex flex-col gap-3"
                  >
                    {/* Existing Assets */}
                    {detailGroup?.assets?.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex h-16 items-center rounded-xl border border-heyhao-border py-5 px-6 gap-4 bg-heyhao-grey/30"
                      >
                        <img
                          src="/assets/images/icons/document-text-black.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                        <span className="file-name w-full max-w-[245px] text-left truncate font-semibold leading-5 text-heyhao-black">
                          {asset.filename.split("/").pop()}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingAsset(asset.id)}
                          className="delete-btn"
                        >
                          <img
                            src="/assets/images/icons/trash-red.svg"
                            className="flex size-6 shrink-0"
                            alt="icon"
                          />
                        </button>
                      </div>
                    ))}

                    {/* New Assets to Upload */}
                    {newAssets.map((file, index) => (
                      <div
                        key={index}
                        className="flex h-16 items-center rounded-xl border border-heyhao-blue/50 py-5 px-6 gap-4"
                      >
                        <img
                          src="/assets/images/icons/document-text-black.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                        <span className="file-name w-full max-w-[245px] text-left truncate font-semibold leading-5 text-heyhao-blue">
                          {file.name} (New)
                        </span>
                        <button
                          type="button"
                          onClick={() => removeNewAsset(index)}
                          className="delete-btn"
                        >
                          <img
                            src="/assets/images/icons/trash-red.svg"
                            className="flex size-6 shrink-0"
                            alt="icon"
                          />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("asset-upload")?.click()
                      }
                      className="group relative flex h-16 items-center rounded-xl border border-heyhao-border py-5 px-6 gap-4 transition-all duration-300 hover:border-heyhao-blue"
                    >
                      <input
                        id="asset-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleAddAsset}
                      />
                      <img
                        src="/assets/images/icons/document-text-grey.svg"
                        className="flex size-6 shrink-0"
                        alt="icon"
                      />
                      <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      <span className="file-name w-full text-left font-semibold leading-5 text-heyhao-secondary">
                        Upload More Media
                      </span>
                      <div className="import-btn">
                        <img
                          src="/assets/images/icons/import-blue.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                      </div>
                    </button>
                    {(errors as any).assets && (
                      <p className="text-red-500 text-xs">
                        {(errors as any).assets.message}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  id="Benefits"
                  className="flex flex-col rounded-3xl p-6 gap-3 bg-white"
                >
                  <p className="font-medium text-sm text-heyhao-secondary">
                    Group Benefit
                  </p>
                  <div
                    id="Input-Benefit-Container"
                    className="flex flex-col gap-3"
                  >
                    {benefitFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative group flex flex-col gap-1"
                      >
                        <div className="relative">
                          <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                            <p className="numbering flex size-4 shrink-0 items-center justify-center text-heyhao-black font-semibold text-lg"></p>
                            <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                          </div>
                          <input
                            type="text"
                            {...register(`benefit.${index}` as any)}
                            placeholder="Type Benefit"
                            className="input-benefit appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[60px] pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                          />
                          {benefitFields.length > 1 && (
                            <div className="absolute transform -translate-y-1/2 top-1/2 right-6">
                              <button
                                type="button"
                                onClick={() => removeBenefit(index)}
                                className="delete-btn cursor-pointer"
                              >
                                <img
                                  src="/assets/images/icons/close-circle-red.svg"
                                  className="flex size-6 shrink-0"
                                  alt="icon"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => appendBenefit("")}
                    id="Add-More-Benefit"
                    className="flex group items-center justify-center rounded-xl p-4 gap-0.5 bg-heyhao-blue/10 transition-all duration-300 hover:bg-heyhao-blue/20"
                  >
                    <span className="font-semibold text-sm text-heyhao-blue">
                      Add More Benefit
                    </span>
                    <img
                      src="/assets/images/icons/add-circle-blue.svg"
                      className="flex size-4 shrink-0"
                      alt="icon"
                    />
                  </button>
                  {(errors as any).benefit && (
                    <p className="text-red-500 text-xs">
                      {(errors as any).benefit.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
