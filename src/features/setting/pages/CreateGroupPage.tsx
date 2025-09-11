import { Link, useLoaderData, useNavigate, useRevalidator } from "react-router";
import Siderbar from "../../../shared/components/Siderbar";
import { useFieldArray, useForm } from "react-hook-form";
import { updateGroupSchema, type CreateGroupValues } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useRef } from "react";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { AxiosError } from "axios";
import { downloadAsset } from "../../../shared/utils/helper";
import { useDeleteAsset } from "../hooks/useDeleteAsset";
import { useUpdateGroup } from "../hooks/useUpdateGroup";
import type { GroupResponseValues } from "../api/getGroup";

export default function CreateGroupPage() {
  const revalidator = useRevalidator();
  const group = useLoaderData() as GroupResponseValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<CreateGroupValues>({
    resolver: zodResolver(updateGroupSchema),
    defaultValues: {
      assets: [],
      name: group?.name,
      about: group?.about,
      type: group?.type as "FREE" | "PAID" | undefined,
      benefits: group?.benefit.map((val) => ({ benefit: val })) ?? [],
      price: group?.price?.toString() ?? "0",
    },
  });

  const inputPriceRef = useRef<HTMLInputElement>(null);
  const btnAddMediaRef = useRef<HTMLButtonElement>(null);
  const btnAddBenefitRef = useRef<HTMLButtonElement>(null);
  const btnUploadsRef = useRef<HTMLButtonElement[]>([]);
  const inputUploadsRef = useRef<HTMLInputElement[]>([]);
  const uploadPhotoRef = useRef<HTMLInputElement>(null);

  const type = watch("type");
  const assets = watch("assets");
  const thumbnail = watch("thumbnail");

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useCreateGroup();
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateGroup(group?.id ?? "");
  const { mutateAsync: mutateDelete } = useDeleteAsset();

  const onDeleteHandler = async (id: string) => {
    try {
      const userConfirmed = confirm("Are you sure to delete this asset?");

      if (userConfirmed) {
        await mutateDelete({ id });

        revalidator.revalidate();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(
          error?.response?.data?.message ?? "An Axios error occured"
        );
      }

      const err = error as Error;
      alert(err?.message ?? "An error occured");
    }
  };

  const thumbnailUrl = useMemo(() => {
    if (thumbnail) {
      return URL.createObjectURL(thumbnail);
    }

    if (group) {
      return group.photo_url;
    }

    return "/assets/images/photos/group-default.svg";
  }, [thumbnail, group]);

  const {
    append: appendBenefit,
    fields: fieldsBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  const {
    append: appendAsset,
    fields: fieldsAsset,
    remove: removeAsset,
  } = useFieldArray({
    control,
    name: "assets",
  });

  const onSubmit = async (data: CreateGroupValues) => {
    console.log(data);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("type", data.type === "FREE" ? "free" : "paid");
      formData.append("about", data.about);
      formData.append("price", data?.price ?? "0");
      formData.append("photo", data.thumbnail);

      if (data.benefits) {
        for (let i = 0; i < (data.benefits ?? []).length; i++) {
          formData.append(`benefit[${i}]`, data?.benefits[i].benefit);
        }
      }

      if (data.assets) {
        for (let i = 0; i < (data.assets ?? []).length; i++) {
          formData.append(`assets`, data?.assets[i].asset);
        }
      }

      if (group) {
        await mutateUpdate(formData);
      } else {
        await mutateAsync(formData);
      }

      navigate("/home/settings/groups");
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(
          error?.response?.data?.message ?? "An Axios error occured"
        );
      }

      const err = error as Error;
      alert(err?.message ?? "An error occured");
    }
  };

  const toggleForm = () => {
    if (type === "PAID") {
      if (inputPriceRef.current) {
        inputPriceRef.current.disabled = false;
      }

      if (btnAddMediaRef.current) {
        btnAddMediaRef.current.disabled = false;
      }

      if (btnAddBenefitRef.current) {
        btnAddBenefitRef.current.disabled = false;
      }

      for (const btn of btnUploadsRef.current) {
        btn.disabled = false;
      }

      for (const input of inputUploadsRef.current) {
        input.disabled = false;
      }
    } else {
      if (inputPriceRef.current) {
        inputPriceRef.current.disabled = true;
      }

      if (btnAddMediaRef.current) {
        btnAddMediaRef.current.disabled = true;
      }

      if (btnAddBenefitRef.current) {
        btnAddBenefitRef.current.disabled = true;
      }

      for (const btn of btnUploadsRef.current) {
        btn.disabled = true;
      }

      for (const input of inputUploadsRef.current) {
        input.disabled = true;
      }
    }
  };

  useEffect(() => {
    toggleForm();

    if (type === "FREE") {
      setValue("assets", []);
      setValue("benefits", []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <aside className="flex h-screen w-fit">
        <Siderbar />
      </aside>
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
              <h1 className="font-bold text-2xl leading-[30px]">
                {group ? "Update Group" : "Create New Group"}
              </h1>
              <nav>
                <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
                  <li>
                    <Link to="/home/settings" className="hover:underline">
                      Settings
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link
                      to="/home/settings/groups"
                      className="hover:underline"
                    >
                      Group Profile
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <span className="font-medium leading-5 text-heyhao-blue">
                      {group ? "Update Group" : "Create New Group"}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
            <button
              type="submit"
              disabled={isPending || isPendingUpdate}
              className="flex shrink-0 rounded-full items-center py-4 px-8 gap-2 bg-heyhao-blue cursor-pointer"
            >
              {isPending || isPendingUpdate ? (
                <>
                  <span className="font-bold leading-5 text-white text-nowrap">
                    Loading...
                  </span>
                  <img
                    src="/assets/images/icons/checklist-white-fill.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                </>
              ) : (
                <>
                  <span className="font-bold leading-5 text-white text-nowrap">
                    {group ? "Update Group" : "Create New Group"}
                  </span>
                  <img
                    src="/assets/images/icons/checklist-white-fill.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                </>
              )}
            </button>
          </div>
          <div id="Content" className="flex flex-1 overflow-y-scroll">
            <div className="flex flex-1 min-h-screen">
              <div
                id="Group-Settings"
                className="flex w-[636px] shrink-0 bg-white"
              >
                <div className="flex flex-col w-full h-fit shrink-0 p-[30px] gap-[30px] bg-white">
                  {/* Group Photo */}
                  <div>
                    <div id="Photo" className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full overflow-hidden size-[100px]">
                        <img
                          id="photo-container"
                          src={thumbnailUrl}
                          alt="image"
                          className="object-cover size-full"
                        />
                      </div>
                      <input
                        ref={uploadPhotoRef}
                        id="file-input"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setValue("thumbnail", e.target.files[0]);
                          }
                        }}
                        className="absolute opacity-0 cursor-pointer"
                      />
                      <button
                        onClick={() => uploadPhotoRef.current?.click()}
                        type="button"
                        id="add-photo"
                        className="flex items-center gap-[6px] px-6 py-4 rounded-full bg-heyhao-black cursor-pointer"
                      >
                        <p className="font-bold leading-[20px] text-white">
                          Add Group Photo
                        </p>
                        <img
                          src="/assets/images/icons/import-grey.svg"
                          alt="icon"
                          className="size-6 shrink-0"
                        />
                      </button>
                    </div>
                    {errors.thumbnail && (
                      <p className="mt-2 text-red-500 font-medium">
                        {errors.thumbnail.message?.toString()}
                      </p>
                    )}
                  </div>
                  {/* Group Name */}
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Group Name
                    </p>
                    <label className="relative group">
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/clipboard-grey.svg"
                          className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/clipboard-black.svg"
                          className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                      <input
                        {...register("name")}
                        type="text"
                        autoComplete="off"
                        placeholder="Enter group name"
                        className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                      />
                    </label>
                    {errors.name && (
                      <p className="text-red-500 font-medium">
                        {errors.name.message?.toString()}
                      </p>
                    )}
                  </div>
                  {/* Group About */}
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      About Group
                    </p>
                    <label className="relative group">
                      <div className="absolute transform -translate-y-1/2 top-8 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/message-text-grey.svg"
                          className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/message-text-black.svg"
                          className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                      <textarea
                        {...register("about")}
                        placeholder="Type descriptions"
                        rows={8}
                        className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                      ></textarea>
                    </label>
                    {errors.about && (
                      <p className="text-red-500 font-medium">
                        {errors.about.message?.toString()}
                      </p>
                    )}
                  </div>
                  {/* Group Type */}
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Group Type
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="relative group flex items-center gap-4 rounded-xl border border-heyhao-border py-5 px-6 hover:border-heyhao-blue has-[:checked]:bg-heyhao-blue/10 has-[:checked]:border-heyhao-blue/10 transition-all duration-300 cursor-pointer">
                        <img
                          src="/assets/images/icons/crown-grey.svg"
                          className="flex size-6 shrink-0 group-has-[:checked]:hidden"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/crown-blue.svg"
                          className="hidden size-6 shrink-0 group-has-[:checked]:flex"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border group-has-[:checked]:border-heyhao-blue/10"></div>
                        <p className="w-full font-semibold text-heyhao-secondary group-has-[:checked]:text-heyhao-blue transition-all duration-300">
                          Free
                        </p>
                        <input
                          {...register("type")}
                          type="radio"
                          value="FREE"
                          disabled={!!group}
                          className="flex size-6 shrink-0 cursor-pointer"
                        />
                      </label>
                      <label className="relative group flex items-center gap-4 rounded-xl border border-heyhao-border py-5 px-6 hover:border-heyhao-blue has-[:checked]:bg-heyhao-blue/10 has-[:checked]:border-heyhao-blue/10 transition-all duration-300  cursor-pointer">
                        <img
                          src="/assets/images/icons/crown-grey.svg"
                          className="flex size-6 shrink-0 group-has-[:checked]:hidden"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/crown-blue.svg"
                          className="hidden size-6 shrink-0 group-has-[:checked]:flex"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border group-has-[:checked]:border-heyhao-blue/10"></div>
                        <p className="w-full font-semibold text-heyhao-secondary group-has-[:checked]:text-heyhao-blue transition-all duration-300">
                          VIP
                        </p>
                        <input
                          {...register("type")}
                          type="radio"
                          value="PAID"
                          disabled={!!group}
                          className="flex size-6 shrink-0 cursor-pointer"
                        />
                      </label>
                      {errors.type && (
                        <p className="text-red-500 font-medium">
                          {errors.type.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Group Price */}
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Group Price
                    </p>
                    <label className="relative group">
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/dollar-square-grey.svg"
                          className="hidden size-6 shrink-0 group-has-[:placeholder-shown]:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/dollar-square-black.svg"
                          className="flex size-6 shrink-0 group-has-[:placeholder-shown]:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                        <span className="font-semibold group-has-[:placeholder-shown]:text-heyhao-secondary text-heyhao-black">
                          Rp
                        </span>
                      </div>
                      <input
                        ref={inputPriceRef}
                        type="number"
                        onChange={(e) => {
                          setValue("price", e.target.value);
                        }}
                        autoComplete="off"
                        placeholder=""
                        defaultValue={group?.price ?? "0"}
                        className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[159px] pl-[110px] gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300 disabled:bg-white"
                      />
                      <div
                        id="VIP-badge"
                        className="absolute transform -translate-y-1/2 top-1/2 right-4 flex gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-[:enabled]:hidden"
                      >
                        <img
                          src="/assets/images/icons/crown-grey-fill.svg"
                          className="flex size-4 shrink-0"
                          alt="icon"
                        />
                        <p className="font-medium text-sm text-heyhao-secondary">
                          VIP Featured
                        </p>
                      </div>
                      <div
                        id="Lifetime-Badge"
                        className="absolute transform -translate-y-1/2 top-1/2 right-4 flex gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-[:disabled]:hidden"
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
                    {errors.price && (
                      <p className="text-red-500 font-medium">
                        {errors.price.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div
                id="Group-Assets-Benefit"
                className="group/parent disabled-all flex flex-col p-[30px] gap-[30px] w-[560px] shrink-0"
              >
                {/* Group Asset */}
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
                    {fieldsAsset.map((field, index) => (
                      <React.Fragment key={field.id}>
                        <button
                          ref={(element) => {
                            if (element) {
                              btnUploadsRef.current[index] = element;
                            }
                          }}
                          type="button"
                          className="btn-upload-file group relative disabled:bg-white flex h-16 items-center rounded-xl border border-heyhao-border py-5 px-6 gap-4 transition-all duration-300"
                        >
                          <input
                            {...register(`assets.${index}.asset`)}
                            ref={(element) => {
                              if (element) {
                                inputUploadsRef.current[index] = element;
                              }
                            }}
                            onChange={(e) => {
                              if (e.target.files) {
                                setValue(
                                  `assets.${index}.asset`,
                                  e.target.files[0]
                                );
                              }
                            }}
                            type="file"
                            name=""
                            id=""
                            className="file-input absolute opacity-0 cursor-pointer"
                          />
                          <img
                            src="/assets/images/icons/document-text-grey.svg"
                            className="flex size-6 shrink-0 group-[.file-uploaded]:hidden"
                            alt="icon"
                          />
                          <img
                            src="/assets/images/icons/document-text-black.svg"
                            className="hidden size-6 shrink-0 group-[.file-uploaded]:flex"
                            alt="icon"
                          />
                          <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                          <span className="file-name w-full max-w-[245px] text-left truncate font-semibold leading-5 text-heyhao-secondary group-[.file-uploaded]:text-heyhao-black">
                            {assets?.[index].asset
                              ? assets?.[index].asset?.name
                              : "Upload Media"}
                          </span>
                          <div
                            id="VIP-badge"
                            className="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-enabled:hidden"
                          >
                            <img
                              src="/assets/images/icons/crown-grey-fill.svg"
                              className="flex size-4 shrink-0"
                              alt="icon"
                            />
                            <p className="font-medium text-sm text-heyhao-secondary">
                              VIP Featured
                            </p>
                          </div>
                          <div className="flex items-center gap-4 group-disabled:hidden">
                            <div className="import-btn">
                              <img
                                src="/assets/images/icons/import-blue.svg"
                                className="flex size-6 shrink-0"
                                alt="icon"
                              />
                            </div>
                            <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                            <div
                              onClick={() => removeAsset(index)}
                              className="delete-btn cursor-pointer"
                            >
                              <img
                                src="/assets/images/icons/trash-red.svg"
                                className="flex size-6 shrink-0"
                                alt="icon"
                              />
                            </div>
                          </div>
                        </button>
                        {errors?.assets?.[index] && (
                          <p className="text-red-500 font-medium">
                            {errors.assets?.[index].asset?.message?.toString()}
                          </p>
                        )}
                      </React.Fragment>
                    ))}
                    {group?.GroupAsset.map((asset) => (
                      <React.Fragment key={asset.id}>
                        <button
                          type="button"
                          className="btn-upload-file group relative disabled:bg-white flex h-16 items-center rounded-xl border border-heyhao-border py-5 px-6 gap-4 transition-all duration-300"
                        >
                          <input
                            type="file"
                            name=""
                            id=""
                            disabled
                            className="file-input absolute opacity-0"
                          />
                          <img
                            src="/assets/images/icons/document-text-grey.svg"
                            className="flex size-6 shrink-0 group-[.file-uploaded]:hidden"
                            alt="icon"
                          />
                          <img
                            src="/assets/images/icons/document-text-black.svg"
                            className="hidden size-6 shrink-0 group-[.file-uploaded]:flex"
                            alt="icon"
                          />
                          <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                          <span className="file-name w-full max-w-[245px] text-left truncate font-semibold leading-5 text-heyhao-secondary group-[.file-uploaded]:text-heyhao-black">
                            {asset.filename}
                          </span>
                          <div
                            id="VIP-badge"
                            className="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-enabled:hidden"
                          >
                            <img
                              src="/assets/images/icons/crown-grey-fill.svg"
                              className="flex size-4 shrink-0"
                              alt="icon"
                            />
                            <p className="font-medium text-sm text-heyhao-secondary">
                              VIP Featured
                            </p>
                          </div>
                          <div className="flex items-center gap-4 group-disabled:hidden">
                            <div
                              onClick={() =>
                                downloadAsset(asset.file_url, asset.filename)
                              }
                              className="import-btn cursor-pointer"
                            >
                              <img
                                src="/assets/images/icons/import-blue.svg"
                                className="flex size-6 shrink-0"
                                alt="icon"
                              />
                            </div>
                            <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                            <div
                              onClick={() => onDeleteHandler(asset.id)}
                              className="delete-btn cursor-pointer"
                            >
                              <img
                                src="/assets/images/icons/trash-red.svg"
                                className="flex size-6 shrink-0"
                                alt="icon"
                              />
                            </div>
                          </div>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                  <button
                    ref={btnAddMediaRef}
                    onClick={() => appendAsset({ asset: null })}
                    type="button"
                    id="Add-More-Media"
                    className="flex group items-center justify-center rounded-xl p-4 gap-0.5 bg-heyhao-blue/10 disabled:bg-heyhao-grey transition-all duration-300 cursor-pointer"
                  >
                    <span className="font-semibold text-sm text-heyhao-secondary hidden group-disabled:block">
                      VIP Featured
                    </span>
                    <span className="font-semibold text-sm text-heyhao-blue group-disabled:hidden">
                      Add More Media
                    </span>
                    <img
                      src="/assets/images/icons/add-circle-blue.svg"
                      className="flex size-4 shrink-0 group-disabled:hidden"
                      alt="icon"
                    />
                  </button>
                </div>
                {/* Group Benefit */}
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
                    {fieldsBenefit.map((field, index) => (
                      <React.Fragment key={field.id}>
                        <label className="relative group">
                          <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                            <p className="flex size-4 shrink-0 items-center justify-center text-heyhao-black font-semibold text-lg group-has-[:placeholder-shown]:text-heyhao-secondary transition-all duration-300">
                              {index + 1}
                            </p>
                            <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                          </div>
                          <input
                            {...register(`benefits.${index}.benefit`)}
                            type="text"
                            placeholder="Type Benefit"
                            className="input-benefit appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[85px] disabled:pr-[171px] pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold disabled:bg-white focus:valid:ring-heyhao-blue transition-all duration-300"
                          />
                          <div className="absolute transform -translate-y-1/2 top-1/2 right-6 flex items-center gap-4">
                            <div
                              id="VIP-badge"
                              className="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-[:enabled]:hidden"
                            >
                              <img
                                src="/assets/images/icons/crown-grey-fill.svg"
                                className="flex size-4 shrink-0"
                                alt="icon"
                              />
                              <p className="font-medium text-sm text-heyhao-secondary">
                                VIP Featured
                              </p>
                            </div>
                            <div className="flex items-center gap-4 group-has-[:disabled]:hidden">
                              <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                              <div
                                onClick={() => removeBenefit(index)}
                                className="delete-btn cursor-pointer"
                              >
                                <img
                                  src="/assets/images/icons/close-circle-red.svg"
                                  className="flex size-6 shrink-0"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                        </label>
                        {errors?.benefits?.[index] && (
                          <p className="text-red-500 font-medium">
                            {errors.benefits?.[index].benefit?.message}
                          </p>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <button
                    ref={btnAddBenefitRef}
                    onClick={() => appendBenefit({ benefit: "" })}
                    type="button"
                    id="Add-More-Benefit"
                    className="flex group items-center justify-center rounded-xl p-4 gap-0.5 bg-heyhao-blue/10 disabled:bg-heyhao-grey transition-all duration-300 cursor-pointer"
                  >
                    <span className="font-semibold text-sm text-heyhao-secondary hidden group-disabled:block">
                      VIP Featured
                    </span>
                    <span className="font-semibold text-sm text-heyhao-blue group-disabled:hidden">
                      Add More Benefit
                    </span>
                    <img
                      src="/assets/images/icons/add-circle-blue.svg"
                      className="flex size-4 shrink-0 group-disabled:hidden"
                      alt="icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
