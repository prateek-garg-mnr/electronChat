import React from "react";
import { useForm } from "react-hook-form";
import BaseLayout from "../layouts/Base";
function ChatCreate() {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};
	return (
		<BaseLayout>
			<div className="centered-view">
				<div className="centered-container">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="centered-container-form"
					>
						<div className="header">Create Chat</div>
						<div className="subheader">chat with other people you know</div>
						<div className="form-container">
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									ref={register}
									type="text"
									className="form-control"
									id="name"
									name="name"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									ref={register}
									type="text"
									name="description"
									className="form-control"
									id="description"
								></textarea>
							</div>
							<div className="form-group">
								<label htmlFor="image">Image</label>
								<input
									ref={register}
									type="text"
									className="form-control"
									id="image"
									name="image"
								/>
							</div>

							<button type="submit" className="btn btn-outline-primary">
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		</BaseLayout>
	);
}

export default ChatCreate;
